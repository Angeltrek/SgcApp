import Banner from '../components/Banner';
import TypeOneContent from '../components/TypeOneContent';
import TypeTwoContent from '../components/TypeTwoContent';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Navbar pth="/about"/>
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
        imageUrlOne="https://autismocadiz.org/wp-content/uploads/2020/01/mision.png"
        imageUrlTwo="https://cdn-icons-png.flaticon.com/512/2421/2421304.png"
        firstTitle="Diego Antonio García Padilla"
        secondTitle="Angel Mauricio Ramírez Herrera"
        textContentOne="Evolucionar la agricultura moderna al proporcionar soluciones tecnológicas avanzadas que 
                ayuden a los agricultores a tomar decisiones informadas, maximizar la calidad y cantidad de sus cosechas, 
                y promover la sostenibilidad en la industria agrícola."
        textContentTwo="Ser líderes en la transformación de la agricultura a nivel mundial, impulsando la adopción de 
      tecnologías innovadoras y sostenibles que mejoren la vida de los agricultores y contribuyan a un futuro 
      agrícola más eficiente y responsable."
        contentLeft={true}
        roundedThumbnail={true}
      />

      <TypeOneContent
        imageUrlOne="https://autismocadiz.org/wp-content/uploads/2020/01/mision.png"
        imageUrlTwo="https://cdn-icons-png.flaticon.com/512/2421/2421304.png"
        firstTitle="Tom"
        secondTitle="Ulises"
        textContentOne="Evolucionar la agricultura moderna al proporcionar soluciones tecnológicas avanzadas que 
                ayuden a los agricultores a tomar decisiones informadas, maximizar la calidad y cantidad de sus cosechas, 
                y promover la sostenibilidad en la industria agrícola."
        textContentTwo="Ser líderes en la transformación de la agricultura a nivel mundial, impulsando la adopción de 
      tecnologías innovadoras y sostenibles que mejoren la vida de los agricultores y contribuyan a un futuro 
      agrícola más eficiente y responsable."
        contentLeft={true}
        roundedThumbnail={true}
      />
      <Footer pth="/about"/>
    </div>
  );
};

export default About;
