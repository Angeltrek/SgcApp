import Histogram from "./Histogram";

export default function SensorInfoContainer({ sensorName, sensorID }) {
  // Función para generar una clave única basada en la marca de tiempo
  const generateUniqueKey = () => {
    return new Date().getTime();
  };

  // Utilizar la función para generar una clave única para el histograma
  const histogramKey = generateUniqueKey();
  return (
    <div className="sensorInfoContainer">
      <h1 className="title">{sensorName}</h1>
      <h4>{sensorID}</h4>
      <div className="parameter-container">
        <button className="sensorButton deleteSensor">
          {" "}
          <i className="fa-solid fa-trash"></i> Delete Sensor{" "}
        </button>
        <button className="sensorButton modifySensor">
          {" "}
          <i className="fa-solid fa-pen"></i> Modify Sensor{" "}
        </button>
      </div>
      <Histogram key={histogramKey} sensorID={sensorID} />
    </div>
  );
}
