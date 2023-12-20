const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");

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

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
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
  host: "localhost",
  user: "root",
  password: "",
  database: "philevent",
});

function runPythonScript() {
  const pythonScript = "python";
  const scriptArgs = ["src/server/webscrapper.py"];

  const pythonProcess = spawn(pythonScript, scriptArgs);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python script output: ${data}`);
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python script error: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      console.log("Python script execution successful");
    } else {
      console.error(`Python script execution failed with code ${code}`);
    }
  });

  pythonProcess.on("error", (error) => {
    console.error(`Error executing Python script: ${error.message}`);
  });
}

app.listen(8080, () => {
  console.log("Connected!");
  runPythonScript();
});

app.get("/", (req, res) => {
  if (req.session.email) {
    return res.json({ valid: true, name: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});

app.get("/allevents", (req, res) => {
  let q = "SELECT * FROM events WHERE date >= CURDATE()";
  const { city, startDate, endDate } = req.query;

  const filters = [];

  if (city) {
    filters.push(`city = '${city}'`);
  }

  if (startDate && endDate) {
    filters.push(`date BETWEEN '${startDate}' AND '${endDate}'`);
  }

  if (filters.length > 0) {
    q += ` AND ${filters.join(" AND ")}`;
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

app.get("/uniquecities", (req, res) => {
  const query = "SELECT DISTINCT city FROM events"; // Query to get distinct cities from your 'events' table

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch cities" });
    }

    const cities = results.map((result) => {
      const city = result.city;
      return city.charAt(0).toUpperCase() + city.slice(1); // Capitalizing the first letter
    });

    // Sending the unique cities as a response
    return res.json({ cities });
  });
});

app.get("/", (req, res) => {
  if (req.session.email) {
    return res.json({ valid: true, name: req.session.username });
  } else {
    return res.json({ valid: false });
  }
});

app.get("/userweek", (req, res) => {
  const { startDate, endDate } = req.query;
  const username = req.session.username;

  let q = `SELECT e.*, u.event_id FROM user_events u
           JOIN events e ON e.id = u.event_id
           WHERE u.username = ?`;

  const queryParams = [username];

  if (startDate && endDate) {
    q += ` AND e.date BETWEEN ? AND ?`;
    // Convert the dates to the format 'YYYY-MM-DD' for the SQL query
    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

    queryParams.push(formattedStartDate, formattedEndDate);
  }

  db.query(q, queryParams, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const formattedEvents = data.map((event) => ({
      id: event.id,
      img: event.image,
      title: event.title,
      date: formatToMonthDayYear(event.date),
      address: event.address,
      time: formatToTimeAMPM(event.time),
    }));

    return res.json(formattedEvents);
  });
});


app.get("/userevents", (req, res) => {
  const q = `SELECT e.*, u.event_id FROM user_events u, events e WHERE e.id = u.event_id AND u.username = '${req.session.username}'`;

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

app.get("/usercalendar", (req, res) => {
  const q = `SELECT e.*, u.event_id FROM user_events u, events e WHERE e.id = u.event_id AND u.username = '${req.session.username}'`;

  db.query(q, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const formattedEvents = data.map((event) => ({
      title: event.title,
      start: new Date(event.date),
      end: new Date(event.date),
      description: `${event.title} on ${formatToMonthDayYear(
        event.date
      )} | ${formatToTimeAMPM(event.time)} - ${event.city}`,
    }));

    return res.json(formattedEvents);
  });
});

// GET request to fetch a specific event by ID
app.get("/events/:id", (req, res) => {
  const eventId = req.params.id;

  // Use a query to fetch the event by ID from the database
  const query = `SELECT * FROM events WHERE id = ${eventId}`;

  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Assuming your data is structured similar to the previous response
    const formattedEvent = {
      id: data[0].id,
      img: data[0].image,
      title: data[0].title,
      date: formatToMonthDayYear(data[0].date),
      time: formatToTimeAMPM(data[0].time),
      city: data[0].city.charAt(0).toUpperCase() + data[0].city.slice(1),
      address: data[0].address,
      description: data[0].description,
      price: data[0].ticket_price,
      link: data[0].link,
    };

    return res.json(formattedEvent);
  });
});

app.post("/addevent/:id", (req, res) => {
  // Extract parameters from the request
  const eventId = req.params.id;
  const username = req.session.username;

  // Check if the event already exists for this user
  const selectQuery =
    "SELECT * FROM user_events WHERE event_id = ? AND username = ?";
  const selectValues = [eventId, username];

  db.query(selectQuery, selectValues, (selectErr, selectData) => {
    if (selectErr) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (selectData.length > 0) {
      // Event already exists for this user
      return res.json({
        success: false,
        message: "Event is already saved!",
      });
    }

    // If the event does not exist, insert it
    const insertQuery =
      "INSERT INTO user_events (`event_id`, `username`) VALUES (?, ?)";
    const insertValues = [eventId, username];

    db.query(insertQuery, insertValues, (insertErr, insertData) => {
      if (insertErr) {
        return res.status(500).json({ error: "Internal Server Error" });
      }

      return res.json({ success: true, message: "Event Added!" });
    });
  });
});

app.delete("/removeevent/:id", (req, res) => {
  const eventId = req.params.id;
  const username = req.session.username;
  const deleteQuery =
    "DELETE FROM user_events WHERE event_id = ? AND username = ?";
  const values = [eventId, username];
  db.query(deleteQuery, values, (insertErr, insertData) => {
    if (insertErr) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    return res.json({ success: true, message: "Successfully removed from your saved events!" });
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
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const insertQuery =
      "INSERT INTO accounts (`firstname`, `lastname`, `email`, `username`, `password`) VALUES (?)";
    const insertValues = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.uname,
      password,
    ];

    db.query(insertQuery, [insertValues], (insertErr, insertData) => {
      if (insertErr) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      req.session.email = req.body.email;
      req.session.username = req.body.uname;
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
          req.session.username = selectData[0].username;
          return res.json({
            success: true,
            message: "Login successful",
            name: req.session,
          });
        } else {
          return res.json({
            success: false,
            message: "Invalid Password!",
          });
        }
      } else {
        return res.json({
          success: false,
          message: "User not Found!",
        });
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

app.put("/update-user-info", (req, res) => {
  if (req.session.email) {
    const { firstName, lastName, username, email, pass } = req.body;

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
      const newpass = await bcrypt.hash(pass, 10);
      const updateQuery =
        "UPDATE accounts SET firstname=?, lastname=?, username=?, password=? WHERE email=?";
      const updateValues = [
        firstName,
        lastName,
        username,
        newpass,
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
