import { asyncMidddlewareError } from "../middlewares/error.js";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";

export const deleteUser = asyncMidddlewareError(
    async (req, res, next) => {
        const userContact = await User.deleteOne({ _id: req.userId });

        if (userContact) {
            // const isSaved = await userContact.save();
            // if (!isSaved) {
            //     return next(new errorHandler("Error in sending message", 402));
            // }

            res.status(201).json({
                success: true,
                message: "User Deleted"
            })
        } else {
            return next(new errorHandler("Error in deleting user!", 422));
        }
    }
);