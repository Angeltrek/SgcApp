# SgcApp

Welcome to the SgcApp documentation! This React App is the heart of our Internet of Things (IoT) project, specifically tailored to meet the unique challenges faced by our company, SGC. As experts in technological solutions for agriculture, we aim to empower farmers with informed decision-making tools to optimize crop quality and yield. Our commitment is to promote sustainable practices and enhance overall efficiency in the agricultural process.

## Technologies Used

This repository hosts a web application built with cutting-edge technologies to ensure optimal performance and a robust user experience. Here are the key technologies employed:

1. **NodeJS:** A server-side JavaScript runtime platform for scalable and efficient application development.

2. **Express:** A web application framework for Node.js, simplifying the development of robust and high-performance web applications.

3. **React:** A JavaScript library for building interactive and dynamic user interfaces, providing a seamless user experience.

4. **MySQL:** A relational database management system ensuring efficient storage and retrieval of information.

In addition to the web application, this repository includes code to connect the ESP32 to the database, facilitating data collection—especially humidity data obtained through a specific sensor. The web application presents this information in an accessible manner, allowing users to visualize and analyze real-time humidity data.

This comprehensive approach not only addresses our current company needs but also anticipates and adapts to future challenges in the agricultural sector. The integration of advanced technologies and devices like the ESP32 reflects our commitment to innovation and continuous improvement in the agro-industrial sector.

# Running SgcApp Arduino Code

To run the SgcApp Arduino code for the ESP32 microcontroller, follow the steps outlined below. This code collects soil humidity data using a specific sensor and sends it to a Node.js server for further processing and storage in a MySQL database.

## Prerequisites

Before running the code, ensure you have the following prerequisites:

1. **Arduino IDE:** Install it on your development machine from the [Arduino website](https://www.arduino.cc/en/software).

2. **ESP32 Board Support:** Add support for the ESP32 board to the Arduino IDE. Follow instructions in the [ESP32 Arduino Core GitHub repository](https://github.com/espressif/arduino-esp32).

3. **USB-to-UART Bridge Driver:** Install the [CP210x USB to UART Bridge VCP Drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers), commonly used in ESP32 boards.

## Configuration

1. Open the ESP32 SgcApp code in the Arduino IDE.

2. Set up your WiFi credentials:

    ```cpp
    const char *ssid = "YourWiFiSSID";
    const char *password = "YourWiFiPassword";
    ```

3. Modify the server URL in the code:

    ```cpp
    String url = "https://your-nodejs-server-url/api/insert-data";
    ```

4. Ensure necessary libraries are installed in the Arduino IDE: "Sketch" -> "Include Library" -> "Manage Libraries" and search for and install:

    - WiFi
    - HTTPClient

5. Every sensor has his own ID, so you can modify it in the code (Follow the MER):

    ```cpp
    String IDSensor = "your-sensor-id";
    ```

## Uploading and Running

1. Connect your ESP32 board to your computer.

2. Select the correct board and port in the Arduino IDE:

    - Go to "Tools" -> "Board" and select your ESP32 board.
    - Go to "Tools" -> "Port" and select the appropriate port.

3. Click the "Upload" button in the Arduino IDE to compile and upload the code to your ESP32 board.

4. Open the Serial Monitor (Tools -> Serial Monitor) to view the serial output, monitoring the connection status and HTTP request/response information.

5. The ESP32 will attempt to connect to the specified WiFi network, sending soil humidity data to the Node.js server at regular intervals.

## Monitoring Data

The code includes a `sendHttpRequest` function that collects soil humidity data and sends it to the specified Node.js server. You can monitor the data on the server side by checking the logs and database entries.

Congratulations! You have successfully set up and run the SgcApp code on your ESP32, enabling the collection and transmission of soil humidity data.

# Server Dependencies Installation Guide

The server for the SgcApp relies on several Node.js packages to function properly. Follow the steps below to install the necessary dependencies.

## Prerequisites

Before proceeding, ensure that you have [Node.js](https://nodejs.org/) installed on your system. You can download it from the official website.

## Installation Steps

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Angeltrek/SgcApp.git
    cd SgcApp/server
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```
    This command installs both the runtime dependencies and development dependencies specified in the `package.json` file.

3. **Verify Installation:**
    Ensure that the installation process completes without errors.

## Usage

### Running in Production

To start the server in production mode, use the following command:

```bash
npm start
```

### Running in Development (with Nodemon)

For development purposes, Nodemon is included as a development dependency. It automatically restarts the server when changes are detected. Use the following command to run the server in development mode:

```bash
npm run dev
```

### Server-Side Code

#### Ports Used:
- **Express Server Port**: 5000

#### Dependencies Used:
- **Express**: Web application framework for Node.js.
- **Body Parser**: Middleware to parse incoming request bodies.
- **CORS**: Enables Cross-Origin Resource Sharing.
- **MySQL**: MySQL database driver for Node.js.
- **Bcrypt**: Library for hashing passwords.
- **JSON Web Token (JWT)**: For user authentication and authorization.

#### API Endpoints:

1. **POST /api/register**
   - Registers a new user with provided username, email, and password.
   - Example: `http://localhost:5000/api/register`

2. **POST /api/login**
   - Logs in a user with provided email and password.
   - Example: `http://localhost:5000/api/login`

3. **GET /api/get/sensor-info**
   - Retrieves sensor information for the authenticated user.
   - Example: `http://localhost:5000/api/get/sensor-info`
   - Requires JWT token in the Authorization header.

4. **GET /api/get/sensor-data**
   - Retrieves sensor data for a specific sensor ID.
   - Example: `http://localhost:5000/api/get/sensor-data?sensorID=1`

5. **POST /api/insert-data**
   - Inserts sensor data into the database.
   - Example: `http://localhost:5000/api/insert-data`

#### Database Configuration:
- Host: localhost
- User: root
- Password: password
- Database: CRUDDataBase

#### CORS Configuration:
- CORS is enabled for all origins (`*`).
- Specific origins can be uncommented in `corsOptions` if needed.

### Client-Side Code

#### Components:

1. **Histogram Component**
   - Displays a line chart of sensor data.
   - Retrieves data from `/api/get/sensor-data` endpoint.

2. **Login Page**
   - Allows users to log in with email and password.
   - Makes a POST request to `/api/login` endpoint.

3. **MySensors Page**
   - Displays a list of sensors for the authenticated user.
   - Retrieves sensor information from `/api/get/sensor-info`.
   - Clicking on a sensor triggers a request to `/api/get/sensor-data`.

4. **Register Page**
   - Allows users to register with a username, email, and password.
   - Makes a POST request to `/api/register` endpoint.

### Instructions:

1. **Server Setup**
   - Ensure Node.js and MySQL are installed.
   - Create the database and table using the provided schema (MER).
   - Run `npm install` to install server-side dependencies.
   - Start the server with `npm run dev` or `node <filename>`.

2. **Client Setup**
   - Run `npm install` in the client directory to install dependencies.
   - Update API URLs in components to match your server.
   - Start the client application with `npm start`.

3. **Notes**
   - Adjust CORS configuration based on your deployment needs.
   - Secure sensitive information such as database credentials and JWT secret.
   - Ensure proper error handling and validation in production environments.
   - Consult respective documentation for more details on used libraries and frameworks.
