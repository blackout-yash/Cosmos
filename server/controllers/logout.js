import { asyncMidddlewareError } from "../middlewares/error.js";

export const logout = asyncMidddlewareError(
    async (req, res, next) => {
        // const ress = res.clearCookie('jwtoken', { path: "/" });
        const ress = res.clearCookie("jwtoken", {
            expires: new Date(Date.now() + 128986400),
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });

        res.status(200).json({
            sucess: true,
            message: "Successfully Logout"
        })
    }
);