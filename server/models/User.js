import mongoose from "mongoose";
import { encrypt } from "../middlewares/encrypt.js";
import { token } from "../middlewares/token.js";
import { addMessage } from "../middlewares/addMessage.js";
import { updateProfile } from "../middlewares/updateProfile.js";
import { updatePassword } from "../middlewares/updatePassword.js";
import { uploadImg } from "../middlewares/uploadImg.js";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    work: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cnf_password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    messages: [
        {
            name: {
                type: String,
                require: true
            },
            email: {
                type: String,
                require: true
            },
            phone: {
                type: Number,
                require: true
            },
            message: {
                type: String,
                require: true
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ],
    img: {
        data: Buffer,
        contentType: String
    }
})

encrypt(userSchema);
token(userSchema);
addMessage(userSchema);
updateProfile(userSchema);
updatePassword(userSchema);
uploadImg(userSchema);

export const User = mongoose.model('User', userSchema);