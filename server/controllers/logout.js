import { asyncMidddlewareError } from "../middlewares/error.js";

export const logout = asyncMidddlewareError(
    async (req, res, next) => {
        const ress = res.clearCookie('jwtoken', { path: "/" });

        res.status(200).json({
            sucess: true,
            message: "Successfully Logout"
        })
    }
);