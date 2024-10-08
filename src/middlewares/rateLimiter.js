import rateLimit from "express-rate-limit";
export const passwordResetLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // Limit each IP to 5 password reset requests per windowMs
    message: 'Too many password reset requests from this IP, please try again later.',
});