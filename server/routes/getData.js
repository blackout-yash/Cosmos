import express from "express";
import { authentication } from "../middlewares/auth.js";
import { getData } from "../controllers/getData.js";

const route = express.Router();

route.get('/getdata', authentication, getData);

export default route;