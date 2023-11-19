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
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {

  const sqlSelect =
  "SELECT * FROM Users";

  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.post("/api/insert", (req, res) => {

    const Username = req.body.UserName;
    const Email = req.body.Email;
    const CurrentPassword = req.body.CurrentPassword;

    const sqlInsert =
    "INSERT INTO Users (Username, Email, CurrentPassword) VALUES (?, ?, ?)";

    db.query(sqlInsert, [Username, Email, CurrentPassword], (err, result) => {
        console.log(err);
    });
})

app.listen(port, () => {
  console.log("running on port 5000");
});
