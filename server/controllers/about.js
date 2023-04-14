import { asyncMidddlewareError } from "../middlewares/error.js";

export const about = asyncMidddlewareError(
    async (req, res, next) => {
        res.send(req.rootUser);
    }
);