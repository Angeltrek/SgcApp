// Importa las dependencias
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

export default function Histogram({ sensorID }) {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:5000/api/set/sensor-data", {
      sensorID: sensorID
    })
    .then(() => {
      fetchSensorData();
    })
    .catch((error) => {
      console.error("Error al enviar datos del sensor:", error);
    });
  }, [sensorID]); // Añade los corchetes para indicar que el efecto no depende de ninguna variable específica
  

  const fetchSensorData = () => {
    Axios.get("http://localhost:5000/api/get/sensor-data")
    .then((response) => {
      console.log("Datos recibidos:", response.data);
      // Obtén los últimos 10 datos de humedad
      const humidities = response.data
        .map((result) => result.Humidity)
        .slice(-10);
  
      setSensorData(humidities);
    })
    .catch((error) => {
      console.log("Error al obtener datos del sensor:", error);
    });
  };

  useEffect(() => {
    console.log("Datos enviados");
    // Después de enviar datos, actualiza los datos del sensor
    fetchSensorData();
    // Configurar intervalo para actualizar cada 5 minutos (ajusta según tus necesidades)
    const intervalId = setInterval(() => {
      fetchSensorData();
    }, 3000); // 300000 ms = 5 minutos

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  // Registra los plugins de ChartJS
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: false,
      },
    },
  };

  // Etiquetas
  const labels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
  ];

  // Datos del gráfico
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: sensorData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="histogram">
      <h3> Parámetros </h3>
      <article className="histogram-container">
        <Line options={options} data={data} />
      </article>
    </div>
  );
}
