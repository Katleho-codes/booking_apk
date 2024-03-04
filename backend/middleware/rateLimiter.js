import { rateLimit } from "express-rate-limit";

// Create and use the rate limiter
export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 1, // Limit each IP to 1 request per `window` (here, per 1 minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
