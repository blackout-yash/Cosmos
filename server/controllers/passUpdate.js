import bycrptjs from "bcryptjs";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";
import { asyncMidddlewareError } from "../middlewares/error.js";

export const passUpdate = asyncMidddlewareError(
    async (req, res, next) => {
        const { password, newPassword } = req.body;
        if (!password || !newPassword) {
            return next(new errorHandler("Password cann't be empty!", 404));
        } else if (password === newPassword) {
            return next(new errorHandler("Old & new password cann't be same", 404));
        }

        const user = req.rootUser
        const old_password = user.password;

        const isSamePass = await bycrptjs.compare(password, old_password);
        if (!isSamePass) {
            return next(new errorHandler("Wrong current password", 400));
        }

        const profile = await user.updatePassword(newPassword);

        if (profile.statusCode == 402) {
            return next(new errorHandler(profile.message, 402));
        }

        const isSaved = await user.save();
        if (!isSaved) {
            return next(new errorHandler("Error in updating password", 402));
        }

        res.status(201).json({
            success: true,
            message: "Password Updated Successfully"
        })
    }
);