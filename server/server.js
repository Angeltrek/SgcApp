const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "CRUDDataBase"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM Users";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/insert", (req, res) => {
  const { UserName, Email, CurrentPassword } = req.body;

  // Verificar si algún dato está vacío
  if (!UserName || !Email || !CurrentPassword) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  const sqlInsert =
    "INSERT INTO Users (Username, Email, CurrentPassword) VALUES (?, ?, ?)";

  db.query(sqlInsert, [UserName, Email, CurrentPassword], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Usuario insertado correctamente");
    }
  });
});

app.listen(port, () => {
  console.log("running on port 5000");
});
