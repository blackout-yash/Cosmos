import { asyncMidddlewareError } from "../middlewares/error.js";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";

export const profileUpdate = asyncMidddlewareError(
    async (req, res, next) => {
        const { name, work, phone } = req.body;

        if (!name || !work || !phone) {
            return next(new errorHandler("All fields are not filled", 402));
        }

        const userContact = await User.findOne({ _id: req.userId });

        if (userContact) {
            const profile = await userContact.updateProfile(name, work, phone);
            if (profile.statusCode == 402) {
                return next(new errorHandler(profile.message, 402));
            }

            const isSaved = await userContact.save();
            if (!isSaved) {
                return next(new errorHandler("Error in updating profile", 402));
            }

            res.status(201).json({
                success: true,
                message: "Profile Successfully Updated"
            })
        } else {
            return next(new errorHandler("User not found!", 422));
        }
    }
);