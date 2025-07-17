import express from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({message: "Token tidak valid"});

    const secret = process.env.JWT_SECRET;
    if(!secret) return res.status(500).json({message: "Internal Server Error"});

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if(err) return res.status(401).json({message: "Token tidak valid"});
        req.user = decoded;
        next();
    })
}