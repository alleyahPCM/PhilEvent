const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "philevent"
})

app.use(express.json())
app.use(cors())

app.listen(8080, ()=>{
    db.query("SELECT * FROM accounts",(err,data)=>{
        if (err) console.log(err)
        else console.log(data)
    })
})

app.post("/signup", (req, res) => {
    const checkQuery = "SELECT * FROM accounts WHERE username = ? OR email = ?";
    const checkValues = [req.body.uname, req.body.email];

    db.query(checkQuery, checkValues, async (checkErr, checkData) => {
        if (checkErr) {
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (checkData && checkData.length > 0) {
            return res.status(400).json({ error: "Username or email already exists" });
        }
        const password = await bcrypt.hash(req.body.password , 10);
        const insertQuery = "INSERT INTO accounts (`firstname`, `lastname`, `email`, `username`, `password`) VALUES (?)";
        const insertValues = [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.uname,
            password
        ];

        db.query(insertQuery, [insertValues], (insertErr, insertData) => {
            if (insertErr) {
                return res.status(500).json({ error: "Internal Server Error" });
            }

            return res.json({ message: "Signup Complete!" });
        });
    });
});