import AboutThree from "../About/AboutThree/AboutThree";
import Breadcumb from "../About/Breadcumb/Breadcumb";
import ProcessThree from "../About/ProcessThree/ProcessThree";
import WhyChooseThree from "../About/WhyChooseThree/WhyChooseThree";
import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import CTAFour from "../Home-4/CTA/CTA";


const About = () => {
  return (
    <Wrapper>
      <HeaderOne />
      <Breadcumb />
      <AboutThree />
      <WhyChooseThree />
      <ProcessThree />
      <CTAFour />
      <FooterBuildMetric />
      <ScrollTopButton />
    </Wrapper>
  );
};

export default About;