const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql");
var IDUser;
var sensorID;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "CRUDDataBase",
});

const corsOptions = {
  origin: "http://localhost:3000", // Reemplaza con la URL de tu aplicación cliente
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/login", (req, res) => {
  const sqlSelect = "SELECT * FROM Users";

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/get/sensor-info", (req, res) => {
  const sqlSelect = "SELECT * FROM Sensors WHERE IDUser = ?";

  db.getConnection((err, connection) => {
    if (err) {
      console.error("Error al obtener una conexión de base de datos:", err);
      res.status(500).send("Error al obtener una conexión de base de datos");
    } else {
      connection.query(sqlSelect, [IDUser.IDUser], (err, result) => {
        connection.release(); // Liberar la conexión después de la consulta
        if (err) {
          console.error("Error al obtener información del sensor:", err);
          res.status(500).send("Error al obtener información del sensor");
        } else {
          res.json(result);
        }
      });
    }
  });
});

app.post("/api/set/sensor-data", (req, res) => {
  sensorID = req.body;
});

app.get("/api/get/sensor-data", (req, res) => {
  const sqlSelect = "SELECT * FROM SensorData WHERE IDSensor = ?";
  console.log(sensorID);

  db.query(sqlSelect, [sensorID.sensorID], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
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

app.post("/api/set-user-id", (req, res) => {
  IDUser = req.body;
});

app.listen(port, () => {
  console.log("running on port 5000");
});
