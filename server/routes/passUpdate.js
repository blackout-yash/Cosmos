import express from "express";
import { authentication } from "../middlewares/auth.js";
import { passUpdate } from "../controllers/passUpdate.js";

const route = express.Router();

route.post('/passUpdate', authentication, passUpdate);

export default route;