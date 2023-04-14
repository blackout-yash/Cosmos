import express from "express";
import { authentication } from "../middlewares/auth.js";
import { deleteUser } from "../controllers/deleteUser.js";

const route = express.Router();

route.delete('/deleteuser', authentication, deleteUser);

export default route;