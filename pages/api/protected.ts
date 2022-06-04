import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';
dotenv.config();
import { Secret, verify } from "jsonwebtoken";

const secret: Secret = process.env.SECRET ?? "Default";

export default function protectedPages(req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;
    const jwt = cookies.AuthToken;

    if (!jwt) {
        return res.status(401).json({
            success: false,
            message: 'You are not logged in.'
        })
    }

    try {
        const data = verify(jwt, secret);
        console.log(`JWT Data: ${data.id}`);
        return res.status(200).json({
            success: true,
            message: 'Successfully Authenticated'
        });
    }

    catch {
        return res.status(401).json({
            success: false,
            message: 'You are not logged in.'
        })
    }




}