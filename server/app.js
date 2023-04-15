import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";

import signup from "./routes/signup.js";
import login from "./routes/login.js";
import about from "./routes/about.js";
import getData from "./routes/getData.js";
import contact from "./routes/contact.js";
import logout from "./routes/logout.js";
import profileUpdate from "./routes/profileUpdate.js";
import passUpdate from "./routes/passUpdate.js";
import uploadImg from "./routes/uploadImg.js";
import getImg from "./routes/getImg.js";
import deleteUser from "./routes/deleteUser.js";

import { connectDB } from "./config/database.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

app.use(express.json());
// app.use(cookies({
//     domain: 'cosmos-server.onrender.com',
//     path: "/"
// }));

app.use(function (req, res, next) {
    if (req.headers.origin) res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    else res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

dotenv.config({
    path: "./config/config.env"
});

connectDB();

app.use('/api', signup);
app.use('/api', login);
app.use('/api', about);
app.use('/api', getData);
app.use('/api', contact);
app.use('/api', logout);
app.use('/api', profileUpdate);
app.use('/api', passUpdate);
app.use('/api', uploadImg);
app.use('/api', getImg);
app.use('/api', deleteUser);

app.get('/', (req, res) => {
    res.send("Hello");
});

app.listen(process.env.PORT, console.log(`Port is running on http://localhost:${process.env.PORT}`));

app.use(errorMiddleware);