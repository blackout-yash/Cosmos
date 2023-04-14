import express from "express";
import { signup } from "../controllers/signup.js";

const route = express.Router();

route.post('/signup', signup)

export default route;