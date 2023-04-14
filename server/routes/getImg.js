import express from "express";
import { authentication } from "../middlewares/auth.js";
import { getImg } from "../controllers/getImg.js";

const route = express.Router();

route.get('/getimage', authentication, getImg);

export default route;