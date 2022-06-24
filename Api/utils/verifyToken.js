import jwt from 'jsonwebtoken';
import {createError} from "../utils/error";

export const verifyToken = (req, res, next) =>{
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401, "You are not authenticated !"));
    }

    jwt.verify(token, process.env.JWT_Secret, (err, user) =>{
        if(err) return next(createError(403, "Token is not valide !"));
        req.user = user;
        next()
    })
}