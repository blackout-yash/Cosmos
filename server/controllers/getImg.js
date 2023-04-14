import { asyncMidddlewareError } from "../middlewares/error.js";
import errorHandler from "../utils/errorHandler.js";

export const getImg = asyncMidddlewareError(
    async (req, res, next) => {
        try {
            const img = req.rootUser.img;
            if (img.data) {
                res.status(200).json(img);
            } else {
                return next(new errorHandler("No Image Found", 404));
            }
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            })
        }
    }
);