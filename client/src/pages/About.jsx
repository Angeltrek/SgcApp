import Banner from "../components/Banner";
import TypeOneContent from "../components/TypeOneContent";
import TypeTwoContent from "../components/TypeTwoContent";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import DiegoImage from "../images/About_Diego.jpg";
import AngelImage from "../images/About_Angel.jpg";
import TomImage from "../images/About_Tom.jpg";
import UlisesImage from "../images/About_Ulises.jpg";

const About = () => {
  return (
    <div>
      <Navbar pth="/about" />
      <Banner
        title="NOSOTROS"
        subtitle="Conócenos"
        imageUrl="https://www.proofhub.com/articles/wp-content/uploads/2019/01/How-to-Improve-Teamwork-and-Collaboration-Skills0A.jpeg"
        imgAlt="About"
      />

      <TypeTwoContent
        title="¿Quienes somos?"
        green={false}
        reverse={false}
        textContent="En SGC, somos una organización dedicada a liderar la revolución en la agricultura moderna. Nuestra pasión es proporcionar soluciones tecnológicas avanzadas que empoderan a los agricultores y transforman la forma en que trabajan la tierra. Nuestro compromiso es claro: ayudar a los agricultores a tomar decisiones informadas y a maximizar tanto la calidad como la cantidad de sus cosechas, mientras promovemos la sostenibilidad y la eficiencia en la industria agrícola."
        imageUrl="https://media.gq.com.mx/photos/61e6c84fe8bd436cce2dfa5c/16:9/w_1600,c_limit/GettyImages-1282659148.jpg"
      />

      <TypeOneContent
        imageUrlOne={DiegoImage}
        imageUrlTwo={AngelImage}
        firstTitle="Diego Antonio García Padilla"
        secondTitle="Angel Mauricio Ramírez Herrera"
        textContentOne="¡Hola! Soy Angel Mauricio Ramírez Herrera, Conserje en Smart Growing Crops. Con una pasión por limpiar baños y trapear pisos, he dedicado 19 años a aprender sobre cómo barrer y limpiar baños."
        textContentTwo="¡Hola! Soy Diego Antonio García Padilla, CEO en Smart Growing Crops. Con una pasión por la tecnología y el emprendimiento, he dedicado 5 años a aprender sobre tecnología y crear soluciones disruptivas."
        contentLeft={true}
        roundedThumbnail={true}
      />

      <TypeOneContent
        imageUrlOne={TomImage}
        imageUrlTwo={UlisesImage}
        firstTitle="Tom"
        secondTitle="Ulises"
        textContentOne="¡Hola! Soy Ulises Carrizalez Lerín, Soy ingeniero en Electrónica Senior en Smart Growing Crops. Con una pasión por el desarrollo electrónico digital he dedicado 4 años al estudio de estudios de sistemas embebidos avanzados, pues me apasiona la automatización de procesos industriales mediante sistemas de control digital."
        textContentTwo="¡Hola! Soy Tom, soy Ingeniero en Robótica Senior en Smart Growing Crops. Con una pasión por la investigación y desarrollo de nueva tecnología, he dedicado 2 años en el estudio de la convergencia entre programación y electrónica digital con el fin de diseñar nuevos gadgets para simplificar la vida cotidiana de las personas."
        contentLeft={true}
        roundedThumbnail={true}
      />
      <Footer pth="/about" />
    </div>
  );
};

export default About;
