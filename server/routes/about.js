import express from "express";
import { about } from "../controllers/about.js";
import { authentication } from "../middlewares/auth.js";

const route = express.Router();

route.get('/about', authentication, about);

export default route;