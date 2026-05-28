import express from 'express';
import { sendMessage, getChatHistory } from '../controllers/message.controller.js';
import { sensitiveLimiter } from '../middleware/security.middleware.js';
import { validateRequest, sendMessageSchema } from '../middleware/validation.middleware.js';

const router = express.Router();

router.post('/', sensitiveLimiter, validateRequest(sendMessageSchema), sendMessage);
router.get('/history/:other_user_id', getChatHistory);

export default router;
