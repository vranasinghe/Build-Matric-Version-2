 
import CTAFour from "../Home-4/CTA/CTA";
import CounterOne from "../Common/Counter/CounterOne";
import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import About from "../Home-1/About/About";
import Client from "../Home-1/Client/Client";
import Hero from "../Home-1/Hero/Hero";
import Portfolio from "../Home-1/Portfolio/Portfolio";
import Process from "../Home-1/Process/Process";
import Service from "../Home-1/Service/Service";
import WhyChoose from "../Home-1/WhyChoose/WhyChoose";



const HomeOne = () => {
	return (
		<Wrapper>
			<div style={{ overflow: "hidden" }}>
				<HeaderOne />
				<Hero />
				<CounterOne />
				<About />
				<Service />
				<WhyChoose />
				<Process />
				<Portfolio />
				<Client />
				<CTAFour />
				<FooterBuildMetric />
				<ScrollTopButton />
			</div>
		</Wrapper>
	);
};

export default HomeOne;
