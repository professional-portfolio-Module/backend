import { Request, Response } from 'express';
import { Message } from '../models/message.model.js';
import catchAsync from '../utils/catchAsync.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

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
