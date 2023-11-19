import '../App.css';
import React from 'react';

const ContactContent = () => {
  return (
    <div className="content-container reverse">
      <div className="content email-contact-section">
        <i className="fa-solid fa-envelope"></i>
        <h3>Contáctanos</h3>
        <form action="" className="email-contact-form">
          <label htmlFor="subject">Asunto</label>
          <input type="text" id="subject" placeholder="Asunto" />

          <label htmlFor="email">Correo</label>
          <input type="text" id="email" placeholder="Correo" />

          <label htmlFor="message">Mensaje</label>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={10}
            placeholder="Mensaje"
            maxLength={240}
          ></textarea>

          <input type="submit" value="Enviar" />
        </form>
      </div>

      <div className="content discord-section">
        <div className="bubble-top"></div>
        <div className="bubble-bottom"></div>
        <i className="fa-brands fa-discord discord-logo"></i>
        <h3 className="subtitle">Únete a nuestro discord</h3>
        <p className="text white">
          Únete a nuestra comunidad que estará dispuesta a ayudarte.
        </p>
        <a href="#" className="discord-button">
          Unirse
        </a>
      </div>
    </div>
  );
};

export default ContactContent;
