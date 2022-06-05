import { NextApiResponse, NextApiRequest } from 'next';
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
import { Secret, sign } from "jsonwebtoken";
import { serialize } from "cookie";
import dotenv from 'dotenv';
dotenv.config();

const secret: Secret = process.env.SECRET ?? "Default";

export default async function validateLogin(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(401).json({
            status: 401,
            message: 'POST Requests Only'
        })
        return
    }

    const db = await new sqlite3.Database('./pages/api/main.db', sqlite3.OPEN_READWRITE, (err: any) => {
        if (err) return console.error(err.message);
    });

    await db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT
    )`);

    const sql = `SELECT id, password from users WHERE email = ?`;

    let queryName = req.body.email;

    db.get(sql, [queryName], async (err: any, data: any) => {
        if (err) {
            return res.json({
                status: 400,
                success: 'false'
            })
        }

        if (data === undefined) {
            return res.status(200).json({
                success: false,
                message: 'No matches for query'
            })
        }

        await bcrypt.compare(req.body.password, data.password, function (err: any, result: any) {
            if (result === true) {

                const token = sign(
                    {
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                        id: data.id
                    },
                    secret
                );

                const serialized = serialize("AuthToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 30,
                    path: "/",
                })

                res.setHeader('Set-Cookie', serialized);

                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: 'Successfully Logged in.'
                });
            }

            return res.status(401).json({
                status: 401,
                success: false,
                message: 'Invalid Password'
            });
        });
    })

    await db.close((err: any) => {
        if (err) return console.error(err.message);
    })

}
