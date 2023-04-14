import errorHandler from "../utils/errorHandler.js";
import { encrypt } from "./encrypt.js";
import { asyncMidddlewareError } from "./error.js";
import bycrptjs from "bcryptjs";

export const updatePassword = asyncMidddlewareError(
    (userSchema) => {
        userSchema.methods.updatePassword = async function (newPassword) {
            this.password = newPassword;
            this.cnf_password = this.password;

            const isSaved = await this.save();
            if (!isSaved) {
                return (new errorHandler("Error in updating password", 402));
            }
            return this.password;
        }
    }
)  