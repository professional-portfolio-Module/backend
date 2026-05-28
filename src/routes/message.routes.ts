import express from 'express';
import { sendMessage, getChatHistory, establishMessageStream } from '../controllers/message.controller.js';
import { sensitiveLimiter } from '../middleware/security.middleware.js';
import { validateRequest, sendMessageSchema } from '../middleware/validation.middleware.js';

const router = express.Router();

router.get('/stream', establishMessageStream);
router.post('/', sensitiveLimiter, validateRequest(sendMessageSchema), sendMessage);
router.get('/history/:other_user_id', getChatHistory);

export default router;
