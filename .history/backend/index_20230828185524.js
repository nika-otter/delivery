import express from "express";

const app = express();

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
