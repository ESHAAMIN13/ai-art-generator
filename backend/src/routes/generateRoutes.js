import express from 'express';
import { generateImage } from '../controllers/generateController.js';
import { generateLimiter } from '../middleware/rateLimiter.js'; // <-- Import limiter

const router = express.Router();

// Route par rate limiter apply kar diya
router.post('/generate', generateLimiter, generateImage);

export default router;