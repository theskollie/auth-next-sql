import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from "cookie";

export default async function logout(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        res.status(401).json({
            status: 401,
            message: 'POST Requests Only'
        })
        return
    }
    const { cookies } = req;
    const jwt = cookies.AuthToken;

    if (jwt) {
        const serialized = serialize("AuthToken", 'null', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        })

        res.setHeader('Set-Cookie', serialized);

        return res.status(200).json({
            status: 200,
            success: true,
            message: 'Successfully Logged Out.'
        });

    } else {
        res.status(200).json({
            status: 200,
            success: false,
            message: 'You were already logged out.'
        });
    }
}