import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoute.js";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

dotenv.config();
const port=process.env.PORT || 5000;

const app = express();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '(c+&76-aewt97-&(-$f!pbj+xmgua+p02qo%j&0a!k=318=iga';

app.use((req, res, next) => {
    const allowedOrigins = ["https://code-test-nabina-vercel.app", "https://code-test-nabina-git-main-elvind007s-projects.vercel.app", "https://code-test-nabina-g9old3drz-elvind007s-projects.vercel.app"];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(setCorsHeaders);
app.use(express.json())
app.use(cookieParser())
app.use('/auth', adminRouter)
app.use(express.static('Public'))

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    console.log('Token:', token); // Debugging statement
    if(token) {
        Jwt.verify(token, JWT_SECRET_KEY, (err ,decoded) => {
            if(err) {
                console.log('JWT Verification Error:', err); // Debugging statement
                return res.json({Status: false, Error: "Wrong Token"});
            }
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        });
    } else {
        console.log('No Token Found'); // Debugging statement
        return res.json({Status: false, Error: "Not authenticated"});
    }
}

app.get('/verify',verifyUser, (req, res)=> {
    return res.json({Status: true, role: req.role, id: req.id});
});

app.listen(port,"0.0.0.0", () => {
    console.log("Server is running")
});
