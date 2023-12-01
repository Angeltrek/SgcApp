import Banner from '../components/Banner';
import TypeOneContent from '../components/TypeOneContent';
import TypeTwoContent from '../components/TypeTwoContent';
import ContactContent from '../components/ContactContent';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar pth="/"/>
      <Banner
        title="SGC"
        subtitle="Tecnologia agricola"
        imageUrl="https://images.nationalgeographic.org/image/upload/v1638892233/EducationHub/photos/crops-growing-in-thailand.jpg"
        imgAlt="Crops"
      />
      <TypeOneContent
        imageUrlOne="https://autismocadiz.org/wp-content/uploads/2020/01/mision.png"
        imageUrlTwo="https://cdn-icons-png.flaticon.com/512/2421/2421304.png"
        firstTitle="Misión"
        secondTitle="Visión"
        textContentOne="Evolucionar la agricultura moderna al proporcionar soluciones tecnológicas avanzadas que 
                ayuden a los agricultores a tomar decisiones informadas, maximizar la calidad y cantidad de sus cosechas, 
                y promover la sostenibilidad en la industria agrícola."
        textContentTwo="Ser líderes en la transformación de la agricultura a nivel mundial, impulsando la adopción de 
      tecnologías innovadoras y sostenibles que mejoren la vida de los agricultores y contribuyan a un futuro 
      agrícola más eficiente y responsable."
        contentLeft={false}
        roundedThumbnail={false}
      />
      <TypeTwoContent
        title="¿A qué nos dedicamos?"
        green={true}
        reverse={true}
        textContent="Nuestra empresa se dedica a proporcionar soluciones tecnológicas avanzadas 
      para la agricultura, permitiendo a los agricultores tomar decisiones informadas y maximizar 
      la calidad y cantidad de sus cosechas, con un enfoque en la sostenibilidad y la eficiencia."
        imageUrl="https://www.rmcg.com.au/app/uploads/2023/01/iStock-491151340-tractor.jpg"
      />
      <ContactContent />
      <Footer pth="/"/>
    </div>
  );
};

export default Home;
