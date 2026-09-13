import FooterBuildMetric from "../Common/Footer/FooterBuildMetric";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import BreadcumbSix from "../Contact/BreadcumbSix/BreadcumbSix";
import ContactArea from "../Contact/ContactArea/ContactArea";
import ContactAreaTwo from "../Contact/ContactAreaTwo/ContactAreaTwo";
import ContactMap from "../Contact/ContactMap/ContactMap";





const Contact = () => {
	return (
		<Wrapper>
			<div style={{ overflow: "hidden" }}>
				<HeaderOne />
				<BreadcumbSix />
				<ContactArea />
				<ContactAreaTwo />
				<ContactMap />
				<FooterBuildMetric />
				<ScrollTopButton />
			</div>
		</Wrapper>
	);
};

export default Contact;
