import express from "express";
import { authentication } from "../middlewares/auth.js";
import { profileUpdate } from "../controllers/profileUpdate.js";

const route = express.Router();

route.post('/updateprofile', authentication, profileUpdate);

export default route;