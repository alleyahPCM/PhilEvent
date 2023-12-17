const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

function formatToMonthDayYear(dateTimeString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const dateObj = new Date(dateTimeString);
  return dateObj.toLocaleDateString("en-US", options);
}

function formatToTimeAMPM(timeString) {
  const dateObj = new Date(`1970-01-01T${timeString}Z`);
  return dateObj.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

const app = express()
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true
  })
);
app.use(bodyParser.json())
app.use(cookieParser());
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
    // const pythonScript = "python src/server/webscrapper.py";

    // exec(pythonScript, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Error executing Python script: ${error}`);
    //     return;
    //   }

    //   console.log(`Python script output: ${stdout}`);
    // });
})

app.get("/", (req,res) => {
  if (req.session.email) {
      return res.json({ valid: true, name: req.session.firstName});
  } else {
      return res.json({ valid: false});
  }
})

app.get("/allevents", (req, res) => {
  let q = "SELECT * FROM events";
  const { city, startDate, endDate } = req.query;

  const filters = [];

  if (city) {
    filters.push(`city = '${city}'`);
  }

  if (startDate && endDate) {
    filters.push(`date BETWEEN '${startDate}' AND '${endDate}'`);
  }

  if (filters.length > 0) {
    q += ` WHERE ${filters.join(' AND ')}`;
  }

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const formattedEvents = data.map((event) => ({
      id: event.id,
      img: event.image,
      title: event.title,
      date: formatToMonthDayYear(event.date),
      time: formatToTimeAMPM(event.time),
      city: event.city.charAt(0).toUpperCase() + event.city.slice(1),
      price: event.ticket_price,
      link: event.link,
    }));

    return res.json(formattedEvents);
  });
});

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
          req.session.email = selectData[0].email;
          req.session.firstName = selectData[0].firstname;
          return res.json({
            success: true,
            message: "Login successful",
            name: req.session,
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

app.get("/fetch-user-info", (req, res) => {
  if (req.session.email) {
    const selectQuery = "SELECT * FROM accounts WHERE email = ?";
    db.query(selectQuery, [req.session.email], (selectErr, selectData) => {
      if (selectErr) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (selectData && selectData.length > 0) {
        const user = {
          firstName: selectData[0].firstname,
          lastName: selectData[0].lastname,
          username: selectData[0].username,
          email: selectData[0].email,
        };

        return res.json({ user });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/update-user-info", (req, res) => {
  if (req.session.email) {
    const { firstName, lastName, username, email, newPassword } = req.body;

    const checkQuery =
      "SELECT * FROM accounts WHERE (username = ? OR email = ?) AND email != ?";
    const checkValues = [username, email, req.session.email];

    db.query(checkQuery, checkValues, async (checkErr, checkData) => {
      if (checkErr) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (checkData && checkData.length > 0) {
        return res
          .status(400)
          .json({ error: "Email or username already exists for another user" });
      }

      const updateQuery =
        "UPDATE accounts SET firstname=?, lastname=?, username=?, password=? WHERE email=?";
      const updateValues = [
        firstName,
        lastName,
        username,
        newPassword,
        req.session.email,
      ];

      db.query(updateQuery, updateValues, (updateErr, updateData) => {
        if (updateErr) {
          return res.status(500).json({ error: "Internal Server Error" });
        }

        return res.json({
          success: true,
          message: "User information updated successfully",
        });
      });
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});