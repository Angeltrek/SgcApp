/**
 * @brief Paquetes
 */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @brief Credenciales de la BD
 */

const dbc = require('./dbCredentials.json');

/**
 * @brief Conexión a la base de datos
 */

const db = mysql.createPool({
  host: dbc.host,
  user: dbc.user,
  password: dbc.password,
  database: dbc.database
});

/*
const corsOptions = {
  origin: ["http://localhost:3000", "https://n18rflgw-3000.usw3.devtunnels.ms", "http://5c:cf:7f:78:6c:8e", "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  headers: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};
*/

/**
 * @brief Dependencias de la app
 */

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @brief Añade un nuevo usuario en la tabla 
 */

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

/**
 * @brief Inicia sesión a través de 
 */

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

/**
 * @brief Get
 */

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

/**
 * @brief Insertar dato obtenido por el sensor (esta dirección será accedida por el sensor)
 */


app.post("/api/insert-data", (req, res) => {
  const { data1, data2 } = req.body;
  const sqlInsert = "INSERT INTO SensorData(IDSensor, Humidity) VALUES (?, ?)";

  console.log(data1);

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

/**
 * @brief Comprueba la conexión con la base de datos
 */

app.listen(port, () => {
  console.log("running on port " + port);
});
