import express from "express";
import { authentication } from "../middlewares/auth.js";

const route = express.Router();

route.get('/auth', authentication, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User Logined!"
    })
});

export default route;