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

  // Efecto secundario para cargar datos del sensor y configurar intervalo de actualización
  useEffect(() => {
    // Función para obtener datos del sensor desde la API
    const fetchSensorData = () => {
      Axios.get("https://n18rflgw-5000.usw3.devtunnels.ms/api/get/sensor-data", {
        params: {
          sensorID: sensorID,
        },
      })
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

    console.log("Datos enviados");
    // Después de enviar datos, actualiza los datos del sensor
    fetchSensorData();
    // Configurar intervalo para actualizar cada 5 minutos (ajusta según tus necesidades)
    const intervalId = setInterval(() => {
      fetchSensorData();
    }, 3000); // 3000 ms = 3 segundos

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [sensorID]); // Agrega sensorID como dependencia para evitar advertencias de linting

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
  const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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
