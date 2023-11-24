const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Esto permite todas las solicitudes, deberías configurarlo para permitir solo el dominio del ESP32
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/api/register", (req, res) => {
  const { UserName, Email, CurrentPassword } = req.body;

  // Verificar si algún dato está vacío
  if (!UserName || !Email || !CurrentPassword) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  // Generar el hash de la contraseña
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(CurrentPassword, saltRounds);

  const sqlInsert =
    "INSERT INTO Users (Username, Email, CurrentPassword) VALUES (?, ?, ?)";

  db.query(sqlInsert, [UserName, Email, hashedPassword], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send("Usuario insertado correctamente");
    }
  });
});

app.post("/api/login", (req, res) => {
  const { Email, CurrentPassword } = req.body;

  // Verificar si algún dato está vacío
  if (!Email || !CurrentPassword) {
    return res.status(400).send("Todos los campos son obligatorios.");
  }

  const sqlSelect = "SELECT * FROM Users WHERE Email = ?";

  db.query(sqlSelect, [Email], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (result.length > 0) {
      const hashedPassword = result[0].CurrentPassword;

      // Verificar la contraseña usando bcrypt
      bcrypt.compare(
        CurrentPassword,
        hashedPassword,
        (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            return res.status(500).send(bcryptErr);
          }

          if (bcryptResult) {
            // Contraseña válida
            const token = jwt.sign(
              { userId: result[0].IDUser, email: result[0].Email },
              "secreto",
              { expiresIn: "1h" }
            );
            res.json({ token, user: result[0] });
          } else {
            // Contraseña inválida
            res.status(401).send("Credenciales incorrectas.");
          }
        }
      );
    } else {
      res.status(401).send("Credenciales incorrectas.");
    }
  });
});

app.get("/api/get/sensor-info", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, "secreto", (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Token no válido" });
    }

    // Decodificar el token y obtener datos del usuario
    const userId = decodedToken.userId;
    const email = decodedToken.email;

    // Realizar operaciones con los datos del usuario (consulta en la base de datos, etc.)
    const sqlSelect = "SELECT * FROM Sensors WHERE IDUser = ?";

    db.getConnection((err, connection) => {
      if (err) {
        console.error("Error al obtener una conexión de base de datos:", err);
        res.status(500).send("Error al obtener una conexión de base de datos");
      } else {
        connection.query(sqlSelect, [userId], (err, result) => {
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
});

app.get("/api/get/sensor-data", (req, res) => {
  const sensorID = req.query.sensorID; // Utiliza req.query en lugar de req.body
  const sqlSelect = "SELECT * FROM SensorData WHERE IDSensor = ?";

  db.query(sqlSelect, [sensorID], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});


app.post("/api/insert-data", (req, res) => {
  const { data1, data2 } = req.body;
  const sqlInsert = "INSERT INTO SensorData(IDSensor, Humidity) VALUES (?, ?)";

  db.query(sqlInsert, [data1, data2], (err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted successfully");
      res.status(200).send("Data inserted successfully");
    }
  });
});

app.listen(port, () => {
  console.log("running on port 5000");
});
