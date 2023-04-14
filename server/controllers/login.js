import bycrptjs from "bcryptjs";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";
import { asyncMidddlewareError } from "../middlewares/error.js";

export const login = asyncMidddlewareError(
    async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new errorHandler("All fields are not filled", 422));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(new errorHandler("Invalid Credentials", 400));
        }

        const isSamePass = await bycrptjs.compare(password, user.password);
        if (!isSamePass) {
            return next(new errorHandler("Invalid Credentials", 400));
        }

        const token = await user.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 128986400),
            httpOnly: false
        });

        res.status(200).json({
            success: true,
            message: "Login Successful"
        })
    }
);