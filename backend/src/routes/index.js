import express from 'express';
import generateRoutes from './generateRoutes.js';

const router = express.Router();

// Saare routes ko yahan register karein
router.use('/generate', generateRoutes);

export default router;