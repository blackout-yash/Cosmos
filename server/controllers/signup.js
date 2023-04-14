import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";
import { asyncMidddlewareError } from "../middlewares/error.js";

export const signup = asyncMidddlewareError(
    async (req, res, next) => {
        const { name, email, phone, work, password, cnf_password } = req.body;
        if (!name || !email || !phone || !work || !password || !cnf_password) {
            return next(new errorHandler("All fields are not filled", 422));
        }

        const isExist = await User.findOne({ email });
        if (isExist) {
            return next(new errorHandler("Email Already Exits", 422));
        } else if (password !== cnf_password) {
            return next(new errorHandler("Password is not matching", 422));
        }

        const user = new User({ name, email, phone, work, password, cnf_password });
        const isSaved = await user.save();

        if (!isSaved) {
            return next(new errorHandler("Error in saving data", 422));
        }

        res.status(200).json({
            success: true,
            message: "User registered"
        })
    }
);