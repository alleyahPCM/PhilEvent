const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PhilEvent APIs",
      version: "v1",
      description:
        "In Fulfillment Of the Requirements for CS 3105 - Application Development | Passed by: Joseph Aaron Amora - 21103553 and Alleyah Pauline Manalili - 21100049",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: [__filename],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication and session management
 *
 *   - name: Events
 *     description: Operations related to events and event data
 *
 *   - name: User
 *     description: User-related operations, including user information and saved events
 *
 *   - name: UserSession
 *     description: Operations related to user sessions and authentication status
 *
 * /:
 *   get:
 *     summary: Check if the user is logged in
 *     tags: [UserSession]
 *     responses:
 *       200:
 *         description: Returns user information if logged in
 *         content:
 *           application/json:
 *             example:
 *               valid: true
 *               name: JohnDoe
 *       404:
 *         description: Returns false if not logged in
 *         content:
 *           application/json:
 *             example:
 *               valid: false
 *
 * /signup:
 *   post:
 *     summary: User signup
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               uname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup complete
 *         content:
 *           application/json:
 *             example:
 *               message: Signup Complete!
 *       400:
 *         description: Username or email already exists
 *         content:
 *           application/json:
 *             example:
 *               error: Username or email already exists
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identifier:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Login successful
 *               name: { "email": "user@example.com", "username": "exampleUser", "authority": "User" }
 *               authority: User
 *       401:
 *         description: Invalid Password
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Invalid Password!
 *       400:
 *         description: User not Found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: User not Found!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /fetch-user-info:
 *   get:
 *     summary: Fetch user information
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns user information
 *         content:
 *           application/json:
 *             example:
 *               user:
 *                 firstName: John
 *                 lastName: Doe
 *                 username: JohnDoe
 *                 email: john@example.com
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *
 * /fetch-all-users-info:
 *   get:
 *     summary: Fetch information of all users (Admin only)
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Returns information of all users
 *         content:
 *           application/json:
 *             example:
 *               users:
 *                 - id: 1
 *                   firstName: John
 *                   lastName: Doe
 *                   username: JohnDoe
 *                   email: john@example.com
 *                   authority: User
 *       404:
 *         description: No users found
 *         content:
 *           application/json:
 *             example:
 *               error: No users found
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /update-user-authority/{userId}:
 *   put:
 *     summary: Update user authority (Admin only)
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *       - in: body
 *         name: newAuthority
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             newAuthority:
 *               type: string
 *     responses:
 *       200:
 *         description: Authority updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Authority updated successfully
 *       400:
 *         description: Missing parameters
 *         content:
 *           application/json:
 *             example:
 *               error: Missing parameters
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               error: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /update-user-info:
 *   put:
 *     summary: Update user information
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *     responses:
 *       200:
 *         description: User information updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User information updated successfully!
 *       400:
 *         description: Email or username already exists for another user
 *         content:
 *           application/json:
 *             example:
 *               error: Email or username already exists for another user
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /allevents:
 *   get:
 *     summary: Get all events based on filters
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter events by city
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events by end date
 *     responses:
 *       200:
 *         description: Returns a list of events
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 img: event_image.jpg
 *                 title: Event Title
 *                 date: December 21, 2023
 *                 time: 7:00 PM
 *                 city: City
 *                 price: 20.00
 *                 link: https://eventlink.com
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /events/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Returns details of a specific event
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               img: event_image.jpg
 *               title: Event Title
 *               date: December 21, 2023
 *               time: 7:00 PM
 *               city: City
 *               address: Event Address
 *               description: Event Description
 *               price: 20.00
 *               link: https://eventlink.com
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             example:
 *               error: Event not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /searchevents/{search}:
 *   get:
 *     summary: Search events by title
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term for event titles
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter events by city
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events by start date
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events by end date
 *     responses:
 *       200:
 *         description: Returns a list of events matching the search term
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 img: event_image.jpg
 *                 title: Event Title
 *                 date: December 21, 2023
 *                 time: 7:00 PM
 *                 city: City
 *                 price: 20.00
 *                 link: https://eventlink.com
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /uniquecities:
 *   get:
 *     summary: Get unique cities with events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Returns a list of unique cities with events
 *         content:
 *           application/json:
 *             example:
 *               cities:
 *                 - City1
 *                 - City2
 *       500:
 *         description: Failed to fetch cities
 *         content:
 *           application/json:
 *             example:
 *               error: Failed to fetch cities
 *
 * /userweek:
 *   get:
 *     summary: Get events for a user within a specified date range
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for the user's events
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for the user's events
 *     responses:
 *       200:
 *         description: Returns a list of events for the user within the specified date range
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 img: event_image.jpg
 *                 title: Event Title
 *                 date: December 21, 2023
 *                 address: Event Address
 *                 time: 7:00 PM
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /userevents:
 *   get:
 *     summary: Get events saved by the user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns a list of events saved by the user
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 img: event_image.jpg
 *                 title: Event Title
 *                 date: December 21, 2023
 *                 time: 7:00 PM
 *                 city: City
 *                 price: 20.00
 *                 link: https://eventlink.com
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /usercalendar:
 *   get:
 *     summary: Get events for the user in a format suitable for a calendar
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Returns a list of events for the user in a calendar-friendly format
 *         content:
 *           application/json:
 *             example:
 *               - title: Event Title
 *                 start: 2023-12-21T00:00:00.000Z
 *                 end: 2023-12-21T00:00:00.000Z
 *                 description: Event Title on December 21, 2023 | 7:00 PM - City
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /addevent/{id}:
 *   post:
 *     summary: Add an event to the user's saved events
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event Added!
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event Added!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 * /removeevent/{id}:
 *   delete:
 *     summary: Remove an event from the user's saved events
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Successfully removed from your saved events!
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Successfully removed from your saved events!
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 *
 */

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

app.get("/searchevents/:search", (req, res) => {
  const eventId = req.params.search;
  let q = `SELECT * FROM events WHERE title LIKE '%${eventId}%'`;
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
  console.log(q);
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
    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

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

    const formattedEvents = data.map((event) => {
      const formattedCity =
        event.city.charAt(0).toUpperCase() + event.city.slice(1);
      return {
        title: event.title,
        start: new Date(event.date),
        end: new Date(event.date),
        description: `${event.title} on ${formatToMonthDayYear(
          event.date
        )} | ${formatToTimeAMPM(event.time)} - ${formattedCity}`,
      };
    });

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

    return res.json({
      success: true,
      message: "Successfully removed from your saved events!",
    });
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
      "INSERT INTO accounts (`firstname`, `lastname`, `email`, `username`, `password`, `authority`) VALUES (?)";
    const insertValues = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.uname,
      password,
      "User",
    ];

    db.query(insertQuery, [insertValues], (insertErr, insertData) => {
      if (insertErr) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      req.session.email = req.body.email;
      req.session.username = req.body.uname;
      req.session.authority = "User";
      return res.json({ message: "Signup Complete!" });
    });
  });
});

app.post("/login", (req, res) => {
  const { identifier, password } = req.body;

  const selectQuery =
    "SELECT email, username, authority, password FROM accounts WHERE (email = ? OR username = ?) AND authority <> 'Deactivated'";
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
          req.session.authority = selectData[0].authority;
          const userAuthority = selectData[0].authority;

          return res.json({
            success: true,
            message: "Login successful",
            name: req.session,
            authority: userAuthority,
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

app.get("/fetch-all-users-info", (req, res) => {
  if (req.session && req.session.authority == "Admin") {
    const selectQuery = "SELECT * FROM accounts";
    db.query(selectQuery, (selectErr, selectData) => {
      if (selectErr) {
        return res.status(500).json({ error: "Error retrieving user data" });
      }

      if (selectData && selectData.length > 0) {
        const users = selectData.map((user) => ({
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          username: user.username,
          email: user.email,
          authority: user.authority,
        }));

        return res.json({ users });
      } else {
        return res.status(404).json({ error: "No users found" });
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

// Update user authority endpoint
app.put("/update-user-authority/:userId", (req, res) => {
  const { userId } = req.params;
  const { newAuthority } = req.body;

  if (!userId || !newAuthority) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const updateQuery = "UPDATE accounts SET authority = ? WHERE id = ?";
  db.query(updateQuery, [newAuthority, userId], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Error updating authority" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Authority updated successfully" });
  });
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
          message: "User information updated successfully!",
        });
      });
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
});
