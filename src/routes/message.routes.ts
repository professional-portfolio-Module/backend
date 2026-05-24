import express from 'express';
import { sendMessage, getChatHistory } from '../controllers/message.controller.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/history/:other_user_id', getChatHistory);

export default router;
