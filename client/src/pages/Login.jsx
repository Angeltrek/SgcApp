import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitUserData = (e) => {

    e.preventDefault();

    Axios.post("http://localhost:5000/api/login", {
      Email: Email,
      CurrentPassword: CurrentPassword
    }).then((response) => {
      console.log(response);
      if(response.data) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate("/my-sensors");
      }
    }).catch((error) => {
      setError("Usuario o contraseña invalidos.");
      setTimeout(() => {
        setError(null);
      }, 3000); // Restablecer el estado de error después de 3 segundos
    });
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login-form">
          <Link to="/" className="sgc-title">
             SGC
          </Link>

          <div className="input-field">
            <label htmlFor="email">Correo electrónico:</label>
            <div className="input-container">
              <img
                src="https://cdn-icons-png.flaticon.com/512/95/95645.png"
                alt="Mail Icon"
                className="icon"
              />
              <input
                type="email"
                id="email"
                name="email"
                className={error ? "error-input" : ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="password">Contraseña:</label>
            <div className="input-container">
              <img
                src="https://w7.pngwing.com/pngs/138/590/png-transparent-computer-icons-password-icon-svg-security-password-icon.png"
                alt="Password Icon"
                className="icon"
              />
              <input
                type="password"
                id="password"
                name="password"
                className={error ? "error-input" : ""}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="button-field">
            <input
              type="button"
              id="register"
              value="Registrarse"
              onClick={goToRegister}
            />
            <input
              type="button"
              id="login"
              value="Iniciar Sesión"
              onClick={submitUserData}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
