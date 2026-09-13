import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import BreadcumbNine from "../Service/BreadcumbNine/BreadcumbNine";
import ClientTwoSharedSection from "../Service/Client/Client";
import Contact from "../Service/Contact/Contact";
import ServiceArea from "../Service/Service/ServiceArea";
import Process from "../Service/Process/Process";
 

const Service = () => {
	return (
		<Wrapper>
			<div style={{ overflow: "hidden" }}>
				<HeaderOne />
				<BreadcumbNine />
				<ServiceArea />
				<Process />
				<ClientTwoSharedSection />
				<Contact />
				<FooterBuildMetric />
				<ScrollTopButton />
			</div>
		</Wrapper>
	);
};

export default Service;
