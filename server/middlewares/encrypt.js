import bycrptjs from "bcryptjs";
import { asyncMidddlewareError } from "./error.js";

export const encrypt = asyncMidddlewareError(
    (userSchema) => {
        userSchema.pre('save', async function (req, res, next) {
            if (this.isModified('password')) {
                this.password = await bycrptjs.hash(this.password, 12);
                this.cnf_password = this.password;
            }
            next();
        })
    }
)  