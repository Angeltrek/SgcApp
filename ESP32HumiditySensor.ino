#include <WiFi.h>
#include <HTTPClient.h>
const int humsuelo = 33;

// Configura tus credenciales de red
const char *ssid = "TOMMMY_BEAR 2383";
const char *password = "^a32970W";

void setup() {
  Serial.begin(115200);

  pinMode(humsuelo, INPUT);

  // Conéctate a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando a WiFi...");
  }
  Serial.println("Conectado a la red WiFi");

  // Realiza la solicitud HTTP al servidor Node.js
  sendHttpRequest();
}

void loop() {
  // Puedes realizar otras tareas aquí si es necesario
  sendHttpRequest();

  delay(3000);
}

void sendHttpRequest() {
  // Crea un objeto HTTPClient
  HTTPClient http;
  String IDSensor = "ABCD-FGC";
  int humedadSuelo = map(analogRead(humsuelo), 4092, 0, 0, 100);

  // Construye la URL del servidor Node.js
  String url = "https://n18rflgw-5000.usw3.devtunnels.ms/api/insert-data";

  // Realiza la solicitud POST
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  // Define los datos que deseas enviar (en formato JSON)
  String jsonData = "{\"data1\":\"" + IDSensor + "\",\"data2\":" + String(humedadSuelo) + "}";

  // Envía los datos al servidor
  int httpResponseCode = http.POST(jsonData);

  // Muestra el código de respuesta del servidor
  Serial.print("Código de respuesta: ");
  Serial.println(httpResponseCode);

  // Cierra la conexión
  http.end();
}