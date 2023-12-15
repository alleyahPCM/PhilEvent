const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express()
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
  })
);
app.use(cookieParser())
app.use(bodyParser.json())
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "philevent"
})

app.listen(8080, ()=>{
    console.log("Connected!");
})

app.get("/", (req,res) => {
    if (req.session.email) {
        return res.json({ valid: true, name: req.session.firstName});
    } else {
        return res.json({ valid: false});
    }
})

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ success: false, message: "Logout failed" });
    }

    res.clearCookie("connect.sid");

    res.json({ success: true, message: "Logout successful" });
  });
});

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
            req.session.email = req.body.email;
            req.session.firstName = req.body.firstName;
            return res.json({ message: "Signup Complete!" });
        });
    });
});

app.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  const selectQuery = "SELECT * FROM accounts WHERE email = ? OR username = ?";
  db.query(
    selectQuery,
    [identifier, identifier],
    async (selectErr, selectData) => {
      if (selectErr) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (selectData && selectData.length > 0) {
        const match = await bcrypt.compare(password, selectData[0].password);

        if (match) {
          // Login successful
          req.session.email = selectData[0].email;
          req.session.firstName = selectData[0].firstname;

          return res.json({
            success: true,
            message: "Login successful",
            name: req.session.firstName,
          });
        } else {
          return res.status(401).json({ error: "Invalid password" });
        }
      } else {
        return res.status(401).json({ error: "Invalid email" });
      }
    }
  );
});