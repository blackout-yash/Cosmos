import errorHandler from "../utils/errorHandler.js";
import { asyncMidddlewareError } from "./error.js";

export const addMessage = asyncMidddlewareError(
    (userSchema) => {
        userSchema.methods.addMessage = async function (name, email, phone, message) {
            this.messages = this.messages.concat({ name, email, phone, message });
            const isSaved = await this.save();
            if (!isSaved) {
                return (new errorHandler("Error in sending message", 402));
            }
            return this.messages;
        }
    }
)  