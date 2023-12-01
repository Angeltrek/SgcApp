import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitUserData = () => {
    Axios.post("https://n18rflgw-5000.usw3.devtunnels.ms/api/register", {
      UserName: UserName,
      Email: Email,
      CurrentPassword: CurrentPassword,
    }).then(() => {
      navigate("/login");
    }).catch((error) => {
      setError("Error en el registro.");
      setTimeout(() => {
        setError(null);
      }, 3000); // Restablecer el estado de error después de 3 segundos
    });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login-form">
        <Link to="/" className="sgc-title">
             SGC
          </Link>

          <div className="input-field">
            <label htmlFor="username">Usuario:</label>
            <div className="input-container">
              <img
                src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                alt="Username Icon"
                className="icon"
              />
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          </div>

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
              value="Iniciar Sesión"
              onClick={goToLogin}
            />
            <input
              type="button"
              id="login"
              value="Registrarse"
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
