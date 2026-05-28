import { Request, Response } from 'express';
import { Message } from '../models/message.model.js';
import catchAsync from '../utils/catchAsync.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

// Registry for Server-Sent Events (SSE) clients
export const sseClients = new Map<string, Response[]>();

/**
 * Establish a Server-Sent Events (SSE) stream for message updates
 * GET /api/messages/stream?userId=...
 */
export const establishMessageStream = (req: Request, res: Response) => {
  const { userId } = req.query;
  if (!userId) {
    res.status(400).json({ success: false, message: 'userId is required' });
    return;
  }

  // Set headers for EventStream connection
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Periodically send heartbeat comments to keep the socket connection open
  const heartbeat = setInterval(() => {
    res.write(': keepalive\n\n');
  }, 30000);

  const uidStr = userId as string;
  const clients = sseClients.get(uidStr) || [];
  clients.push(res);
  sseClients.set(uidStr, clients);

  // Clean up client registration on disconnect
  req.on('close', () => {
    clearInterval(heartbeat);
    const active = sseClients.get(uidStr) || [];
    const idx = active.indexOf(res);
    if (idx > -1) {
      active.splice(idx, 1);
    }
    if (active.length === 0) {
      sseClients.delete(uidStr);
    } else {
      sseClients.set(uidStr, active);
    }
  });
};

/**
 * Send a new direct message
 * POST /api/messages
 */
export const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const { sender_id, receiver_id, message } = req.body;

  if (!sender_id || !receiver_id || !message) {
    throw new ApiError(400, 'sender_id, receiver_id, and message are required');
  }

  const newMessage = await Message.create({
    sender_id,
    receiver_id,
    message,
    is_read: false
  });

  // Notify receiver in real-time
  const receiverClients = sseClients.get(receiver_id);
  if (receiverClients) {
    receiverClients.forEach(client => {
      client.write(`data: ${JSON.stringify(newMessage)}\n\n`);
    });
  }

  // Notify sender (for sync across multiple tabs/windows)
  const senderClients = sseClients.get(sender_id);
  if (senderClients) {
    senderClients.forEach(client => {
      client.write(`data: ${JSON.stringify(newMessage)}\n\n`);
    });
  }

  res.status(201).json(new ApiResponse(201, newMessage, 'Message sent successfully'));
});

/**
 * Fetch chat history between the current user and another user
 * GET /api/messages/history/:other_user_id?sender_id=...
 */
export const getChatHistory = catchAsync(async (req: Request, res: Response) => {
  const { other_user_id } = req.params;
  const { sender_id } = req.query;

  if (!sender_id || !other_user_id) {
    throw new ApiError(400, 'sender_id query parameter and other_user_id path parameter are required');
  }

  const chatHistory = await Message.find({
    $or: [
      { sender_id, receiver_id: other_user_id },
      { sender_id: other_user_id, receiver_id: sender_id }
    ]
  } as any).sort({ created_at: 1 });

  res.status(200).json(new ApiResponse(200, chatHistory, 'Chat history fetched successfully'));
});
