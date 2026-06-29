import rateLimit from 'express-rate-limit';

export const generateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 Hour window
    max: 15, // Limit each IP to 15 image generation requests per hour
    message: {
        success: false,
        error: 'Too many images generated from this IP. Please try again after an hour. Cooldown active!'
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});