import { asyncMidddlewareError } from "../middlewares/error.js";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";

export const contact = asyncMidddlewareError(
    async (req, res, next) => {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return next(new errorHandler("All fields are not filled", 402));
        }

        const userContact = await User.findOne({ _id: req.userId });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            if (userMessage.statusCode == 402) {
                return next(new errorHandler(userMessage.message, 402));
            }

            const isSaved = await userContact.save();
            if (!isSaved) {
                return next(new errorHandler("Error in sending message", 402));
            }

            res.status(201).json({
                success: true,
                message: "Message Send"
            })
        } else {
            return next(new errorHandler("User not found!", 422));
        }
    }
);