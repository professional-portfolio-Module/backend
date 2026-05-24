import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage extends Document {
  sender_id: string;
  receiver_id: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

const MessageSchema: Schema = new Schema({
  sender_id: { type: String, required: true, index: true },
  receiver_id: { type: String, required: true, index: true },
  message: { type: String, required: true },
  is_read: { type: Boolean, default: false },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: false }
});

// Compound index for querying chat history between two users efficiently
MessageSchema.index({ sender_id: 1, receiver_id: 1, created_at: 1 });

export const Message = mongoose.model<IMessage>('Message', MessageSchema);
