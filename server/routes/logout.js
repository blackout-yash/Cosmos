import express from "express";
import { authentication } from "../middlewares/auth.js";
import { logout } from "../controllers/logout.js";

const route = express.Router();

route.delete('/logout', authentication, logout);

export default route;