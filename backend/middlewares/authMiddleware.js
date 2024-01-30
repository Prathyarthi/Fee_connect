import jwt from "jsonwebtoken";
import { config } from "dotenv"
config()
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"

const authMiddleware = asyncHandler(async (req, res, next) => {
    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //     return res.status(403).json({
    //         success: false,
    //         message: "Invalid Header"
    //     });
    // }

    // const token = authHeader.split(' ')[1];

    const { token } = req.cookies;

    if (!token) {
        return next(new ApiError("Unauthorized, please login to continue", 401));
    }
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
});
// const adminMiddleware = (...roles) =>
//     asyncHandler(async (req, res, next) => {
//         const { token } = req.cookies;

//         if (!token) {
//             return next(new ApiError("Unauthorized, please login to continue", 401));
//         }
//         const decodedRole = jwt.verify(token, process.env.JWT_SECRET);
//         if (decodedRole.role) {
//             console.log(decodedRole.role);
//             req.user.role = decodedRole.role;
//         }
//         console.log(req.user.role);
//         if (!roles.includes(req.user.role)) {
//             return next(new ApiError("You don't have permission to access this route", 403))
//             next()
//         }
//     })

const adminMiddleware = (...roles) =>
    asyncHandler(async (req, res, next) => {
        const { token } = req.cookies;

        if (!token) {
            return next(new ApiError("Unauthorized, please login to continue", 401));
        }

        try {
            const decodedRole = jwt.verify(token, process.env.JWT_SECRET);

            if (!decodedRole.role) {
                return next(new ApiError("Role information not found in the token", 403));
            }

            // Assuming req.user is an object, initialize it if not present
            req.user = req.user || {};

            req.user.role = decodedRole.role;
            console.log(req.user.role);

            if (!roles.includes(req.user.role)) {
                return next(new ApiError("You don't have permission to access this route", 403));
            }

            // Only call next() if the user has the required role
            next();
        } catch (err) {
            return next(new ApiError("Could not verify the token", 403));
        }
    });


export {
    authMiddleware,
    adminMiddleware
}
