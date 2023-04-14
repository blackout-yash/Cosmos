import { asyncMidddlewareError } from "../middlewares/error.js";

export const getData = asyncMidddlewareError(
    async (req, res, next) => {
        res.send(req.rootUser);
    }
);