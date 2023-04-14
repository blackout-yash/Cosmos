import jwt from "jsonwebtoken";
import { asyncMidddlewareError } from "./error.js";

export const token = asyncMidddlewareError(
    (userSchema) => {
        userSchema.methods.generateAuthToken = async function () {
            let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({ token });
            await this.save();
            return token;
        }
    }
)  