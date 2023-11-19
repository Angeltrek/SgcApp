import React,{ useState, useEffect } from "react";
import Axios from "axios";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [CurrentPassword, setCurrentPassword] = useState("");

  const submitUserData = () => {
    Axios.post("http://localhost:5000/api/insert", {
      UserName: UserName,
      Email: Email,
      CurrentPassword: CurrentPassword,
    }).then(() => {
      alert('Succesful Insert.');
    });
  };

  return (
    <div className="container">
      <div className="login">
        <div className="login-form">
          <h1 className="sgc-title">SGC</h1>

          <div className="google-container">
            <img
              className="google-logo"
              src="https://seeklogo.com/images/G/google-logo-28FA7991AF-seeklogo.com.png"
              alt="Google Logo"
            />
            <button className="google-sign-in">Ingresa con Google</button>
          </div>

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
              value="Registrarse"
              onClick={submitUserData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
