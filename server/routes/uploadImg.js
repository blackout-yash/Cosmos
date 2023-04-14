import express from "express";
import { authentication } from "../middlewares/auth.js";
import { uploadImg } from "../controllers/uploadImg.js";
import { delFile } from "../middlewares/delfile.js";
import { upload } from "../config/multer.js";

const route = express.Router();

route.post('/uploading', authentication, upload.single('image'), uploadImg, delFile);

export default route;