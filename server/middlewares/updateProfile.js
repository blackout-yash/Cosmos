import errorHandler from "../utils/errorHandler.js";
import { asyncMidddlewareError } from "./error.js";

export const updateProfile = asyncMidddlewareError(
    (userSchema) => {
        userSchema.methods.updateProfile = async function (name, work, phone) {
            if (this.name === name && this.work === work && this.phone === phone) {
                return (new errorHandler("Error: Atleast one field needs to be different", 402));
            }

            this.name = name;
            this.work = work;
            this.phone = phone;
            const isSaved = await this.save();
            if (!isSaved) {
                return (new errorHandler("Error in updating profile", 402));
            }
            return this.name;
        }
    }
)  