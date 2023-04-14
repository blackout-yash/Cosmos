import errorHandler from "../utils/errorHandler.js";
import { asyncMidddlewareError } from "./error.js";

export const uploadImg = asyncMidddlewareError(
    (userSchema) => {
        userSchema.methods.uploadImg = async function (obj) {
            this.img.data = obj.img.data;
            this.img.contentType = obj.img.contentType;

            const isSaved = await this.save();
            if (!isSaved) {
                return (new errorHandler("Error in saving image", 402));
            }
            return this.img;
        }
    }
)  