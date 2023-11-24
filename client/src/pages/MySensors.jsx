import React, { useState, useEffect, useRef } from "react";
import SensorInfoContainer from "../components/SensorInfoContainer";
import Axios from "axios";

const MySensors = () => {
  const navItemContainerRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);
  const [sensorData, setSensorData] = useState([]);
  const [sensorID, setSensorID] = useState("");
  const [sensorName, setSensorName] = useState("");
  const [sensorInfoKey, setSensorInfoKey] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:5000/api/get/sensor-info", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        setSensorData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        // Puedes manejar el error aquí, por ejemplo, seteando un estado de error
      });
  }, []);

  const SensorItem = ({ sensor }) => (
    <button className="sensorButton" onClick={() => handleSensorClick(sensor)}>
      <i className="fa-solid fa-wifi"></i> {sensor.SensorName}
    </button>
  );

  const handleSensorClick = (sensor) => {
    setSensorID(sensor.IDSensor);
    setSensorName(sensor.SensorName);
    // Actualiza la clave para que el componente SensorInfoContainer se vuelva a montar
    setSensorInfoKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const mobileMenuToggle = mobileMenuToggleRef.current;

    const handleClick = () => {
      if (navItemContainerRef.current) {
        navItemContainerRef.current.classList.toggle("show-lateral-menu");
      }
    };

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", handleClick);
    }

    return () => {
      if (mobileMenuToggle) {
        mobileMenuToggle.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <div className="mySensors">
      <div className="top-container">
        <div className="toggle-container">
          <h3 className="sgc">SGC</h3>
          <button
            className="lateral-toggle"
            ref={mobileMenuToggleRef}
            aria-label="Toggle Mobile Menu"
          >
            <i className="fa-solid fa-bars menu-icon"></i>
          </button>
        </div>
      </div>
      <div className="sideNavbar" ref={navItemContainerRef}>
        <nav className="container">
          <div className="buttonContainer">
            {sensorData.map((sensor) => (
              <SensorItem key={sensor.IDSensor} sensor={sensor} />
            ))}
            <button className="sensorButton addSensor">
              {" "}
              <i className="fa-solid fa-plus"></i> Add Sensor{" "}
            </button>
          </div>
        </nav>
      </div>
      {sensorID ? (
        <SensorInfoContainer
          key={sensorInfoKey}
          sensorName={sensorName}
          sensorID={sensorID}
        />
      ) : (
        <div className="sensorInfoContainer">
          <div className="info-container">
          <h1 className="title">Monitorea tus cultivos</h1>
          <h3>
            Descubre la Revolución en el Monitoreo Agrícola: Cultivamos Datos
            para Cosechar Éxito
          </h3>
          <p className="text">
            En nuestro compromiso de llevar la agricultura al siguiente nivel,
            te presentamos una herramienta única diseñada para optimizar el
            manejo de la humedad en tus campos. ¿Qué puedes esperar de nuestra
            aplicación?
          </p>
          <img src="https://blog.aepla.es/wp-content/uploads/2020/06/cultivos-sanos-agricultura-sostenible.jpeg" alt="" />
          <h3>Datos en Tiempo Real:</h3>
          <p className="text">
            Obtén información precisa y actualizada sobre la humedad del suelo
            en tus cultivos. Nuestra aplicación proporciona lecturas en tiempo
            real para que tomes decisiones informadas en el momento adecuado.
          </p>
          <img src="https://images.spiceworks.com/wp-content/uploads/2022/08/02141047/facets-of-data-analytics.jpg" alt="" />
          <h3>Historial Detallado:</h3>
          <p className="text">
            Accede a un historial detallado de las lecturas de humedad. Analiza
            patrones a lo largo del tiempo y ajusta tus estrategias de riego
            para maximizar la eficiencia y minimizar el desperdicio de recursos.
          </p>
          <img src="https://www.analyticsinsight.net/wp-content/uploads/2021/01/Analytics-1024x622.jpeg" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MySensors;
