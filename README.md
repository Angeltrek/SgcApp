# SgcApp
React App for IOT(Internet Of Things) project.

This documentation outlines the Internet of Things (IoT) project designed to address the specific challenges of our company, "SGC." SGC specializes in providing advanced technological solutions for the agricultural sector, with the goal of empowering farmers to make informed decisions and optimize both the quality and quantity of their crops. Our main priority is to promote sustainable agricultural practices and enhance efficiency in the process.

The repository associated with this project hosts a web application built with various key technologies, ensuring optimal performance and a robust user experience. The following are the technologies used:

1. **NodeJS:** Server-side JavaScript runtime platform that enables the development of scalable and efficient applications.

2. **Express:** Web application framework for Node.js that simplifies the development of robust and high-performance web applications.

3. **React:** JavaScript library for building interactive and dynamic user interfaces, providing a seamless user experience.

4. **MySQL:** Relational database management system that ensures efficient storage and retrieval of information.

In addition to the web application, the repository includes the code necessary to establish the connection between the ESP32 and the database. This component is essential for data collection, especially regarding humidity, which is obtained through a specific sensor. The collected information is presented in an accessible manner in the web application, allowing users to visualize and analyze real-time humidity data.

This comprehensive approach aims not only to address the current needs of our company but also to anticipate and adapt to future challenges in the agricultural sector. The combination of advanced technologies and the integration of devices like the ESP32 reflects our commitment to innovation and continuous improvement in the agro-industrial sector.

# Running SgcApp Arduino Code

To run the SgcApp arduino code, follow the steps outlined below. This code is designed for an ESP32 microcontroller, and it collects soil humidity data using a specific sensor. The data is then sent to a Node.js server via an HTTP request for further processing and storage in a MySQL database.

## Prerequisites

Ensure you have the following prerequisites before running the code:

1. **Arduino IDE:** Install the Arduino IDE on your development machine. You can download it from the [Arduino website](https://www.arduino.cc/en/software).

2. **ESP32 Board Support:** Add support for the ESP32 board to the Arduino IDE. Follow the instructions provided in the [ESP32 Arduino Core GitHub repository](https://github.com/espressif/arduino-esp32).

4. **USB-to-UART Bridge Driver:** We've use the next USB to serial converter chips installed on most of the ESP32 boards produced by Espressif [CP210x USB to UART Bridge VCP Drivers](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers).


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

4. Ensure you have the necessary libraries installed. In the Arduino IDE, go to "Sketch" -> "Include Library" -> "Manage Libraries" and search for and install the following:

    - WiFi
    - HTTPClient

## Uploading and Running

1. Connect your ESP32 board to your computer.

2. Select the correct board and port in the Arduino IDE:

    - Go to "Tools" -> "Board" and select your ESP32 board.
    - Go to "Tools" -> "Port" and select the appropriate port.

3. Click the "Upload" button in the Arduino IDE to compile and upload the code to your ESP32 board.

4. Open the Serial Monitor (Tools -> Serial Monitor) to view the serial output. This will help you monitor the connection status and HTTP request/response information.

5. The ESP32 will attempt to connect to the specified WiFi network. Once connected, it will send soil humidity data to the Node.js server at regular intervals.

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
