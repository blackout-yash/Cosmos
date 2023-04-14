import { asyncMidddlewareError } from "../middlewares/error.js";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";
import path from "path";
import fs from "fs";
import { __dirname } from "../config/multer.js";

export let filepath;
export const uploadImg = asyncMidddlewareError(
    async (req, res, next) => {
        try {
            if (!req.file.filename) {
                return next(new errorHandler("Image not seleted", 404));
            }

            filepath = path.join(__dirname + "/uploads/" + req.file.filename);
            const obj = {
                img: {
                    data: fs.readFileSync(filepath),
                    contentType: 'image/*'
                }
            }

            const user = await User.findOne({ _id: req.userId });

            if (user) {
                const img = await user.uploadImg(obj);
                if (img.statusCode == 402) {
                    return next(new errorHandler(img.message, 402));
                }

                const isSaved = await user.save();
                if (!isSaved) {
                    return next(new errorHandler("Error in saving img", 402));
                }
                next();
            } else {
                return next(new errorHandler("Error in finding user", 402));
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message: "Error in img changing"
            })
        }
    }
);

// export const _filepath = filepath;