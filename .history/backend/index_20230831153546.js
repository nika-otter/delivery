import express from "express";
import mysql from "mysql";
import cors from "cors";
// const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.listen(5000, () => console.log("Server running on port 5000"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "new_schema",
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Create a new transport
app.post("/transport", (req, res) => {
  const {
    driver_id,
    location_id,
    transport_status,
    shipped_date,
    delivered_date,
  } = req.body;
  const sql =
    "INSERT INTO Transport (driver_id, location_id, transport_status, shipped_date, delivered_date) VALUES ( ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [driver_id, location_id, transport_status, shipped_date, delivered_date],
    (err, result) => {
      if (err) {
        console.error("Error creating transport:", err);
        res.status(500).json({ error: "Error creating transport" });
      } else {
        res.status(201).json({ id: result.insertId });
      }
    }
  );
});

// Get all transports
app.get("/transport", (req, res) => {
  const sql = "SELECT * FROM Transport";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching transports:", err);
      res.status(500).json({ error: "Error fetching transports" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Create a new driver
app.post("/driver", (req, res) => {
  const { family_name, first_name, phone_number, email } = req.body;
  const sql =
    "INSERT INTO Driver (family_name, first_name, phone_number, email) VALUES (?, ?, ?, ?)";
  db.query(
    sql,
    [family_name, first_name, phone_number, email],
    (err, result) => {
      if (err) {
        console.error("Error creating driver:", err);
        res.status(500).json({ error: "Error creating driver" });
      } else {
        res.status(201).json({ id: result.insertId });
      }
    }
  );
});

// Get all drivers
app.get("/driver", (req, res) => {
  const sql = "SELECT * FROM driver";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching drivers:", err);
      res.status(500).json({ error: "Error fetching drivers" });
    } else {
      res.status(200).json(results);
    }
  });
});

// Create a new transport schedule
app.post("/transportschedule", (req, res) => {
  const { gate_id, transport_id, delivered_hour } = req.body;
  const sql =
    "INSERT INTO TransportSchedule (gate_id, transport_id, delivered_hour) VALUES (?, ?, ?)";
  db.query(sql, [gate_id, transport_id, delivered_hour], (err, result) => {
    if (err) {
      console.error("Error creating transport schedule:", err);
      res.status(500).json({ error: "Error creating transport schedule" });
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

// Get all transport schedules
app.get("/transportschedule", (req, res) => {
  const sql = "SELECT * FROM TransportSchedule";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching transport schedules:", err);
      res.status(500).json({ error: "Error fetching transport schedules" });
    } else {
      res.status(200).json(results);
    }
  });
});
