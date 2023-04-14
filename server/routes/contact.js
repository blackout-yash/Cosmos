import express from "express";
import { contact } from "../controllers/contact.js";
import { authentication } from "../middlewares/auth.js";

const route = express.Router();

route.post('/contact', authentication, contact);

export default route;