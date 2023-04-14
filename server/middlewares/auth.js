import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { asyncMidddlewareError } from "./error.js";
import errorHandler from "../utils/errorHandler.js";

export const authentication = asyncMidddlewareError(
    async (req, res, next) => {
        const token = req.cookies.jwtoken;
        if (!token) {
            return next(new errorHandler("Please Login to Continue", 498));
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: verifyToken, "tokens.token": token });

        if (!rootUser) {
            return next(new errorHandler("User not found", 404));
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();
    }
)