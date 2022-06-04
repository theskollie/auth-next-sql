import { NextApiResponse, NextApiRequest } from 'next';
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');
const saltRounds = 8;

export default async function validateRegister(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(401).json({
            status: 401,
            message: 'POST Requests Only'
        })
        return
    }
    let sql: String;
    const db = await new sqlite3.Database('./pages/api/main.db', sqlite3.OPEN_READWRITE, (err: any) => {
        if (err) return console.error(err.message);
        console.log("connection successful");
    });

    await db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT
    )`);
    const { email, password } = req.body;

    await bcrypt.hash(password, saltRounds, async function (err: any, hash: any) {
        sql = `INSERT INTO users (email,password) VALUES ("${email}", "${hash}")`;

        await db.run(sql, (err: any) => {
            if (err) {
                console.log(err);
                return res.json({
                    status: 400,
                    success: 'false'
                })
            }
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'User Successfully Registered'
            });

        })

        sql = `SELECT * from users`;

        await db.all(sql, (err: any, row: any) => {
            console.log(row);
        })

        await db.close((err: any) => {
            if (err) return console.log(err.message);
        })
    });

}

    // const sql = `INSERT INTO users (email, password)
    // VALUES('joe@gmail.com', 'joseph')
    // `;

    // db.all(sql, [], (err: any, rows: any) => {
    //     if (err) return console.error(err.message);

    //     let success = false;
    //     rows.forEach((row: any) => {
    //         console.log(row);
    //     })
    // });