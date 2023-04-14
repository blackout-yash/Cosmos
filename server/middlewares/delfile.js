import fs from "fs";
import { filepath } from "../controllers/uploadImg.js";
import errorHandler from "../utils/errorHandler.js";
import { asyncMidddlewareError } from "./error.js";

export const delFile = asyncMidddlewareError(
    (req, res, next) => {
        try {
            fs.unlink(filepath, (error) => {
                if (error) {
                    return next(errorHandler("Error in deleting temp file", 404));
                }
                res.status(200).json({
                    success: true,
                    message: "Image Successfully Saved"
                })
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            })
        }
    }
)