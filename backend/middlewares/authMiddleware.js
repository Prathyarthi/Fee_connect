import jwt from "jsonwebtoken";
import { config } from "dotenv"
config()
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            success: false,
            message: "Invalid Header"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        }

    } catch (err) {
        return res.status(403).json({
            success: false,
            message: "Could not verify the token"
        });
    }
};
const adminMiddleware = (...roles) =>
    asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ApiError("You don't have permission to access this route", 403))
        }
        next()
    })


export {
    authMiddleware,
    adminMiddleware
}
