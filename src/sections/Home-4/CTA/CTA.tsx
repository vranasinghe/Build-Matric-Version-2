import { Link } from "react-router-dom";
import { useContent } from "../../../admin/ContentContext";

const CTA = () => {
    const { content } = useContent();
    const cta = content.ctaFour;

    return (
        <div
            className="bg-shape background-image"
            style={{ backgroundImage: "url('/assets/img/bg/cta-bg4-2.png')" }}
        >
            {/* top container or img section */}
            <div className="cta-area-4 space-top space-bottom" id="contact-sec">
                <div className="container">
                    <div
                        className="cta-wrap4 text-center background-image"
                        style={{ backgroundImage: `url('${cta.bgImage || "/assets/img/bg/cta-bg4-1.png"}')` }}
                        data-overlay="title"
                        data-opacity="6"
                    >
                        <div className="title-area mb-30">
                            <span className="sub-title text-white">
                                {cta.subtitle}
                            </span>
                            <h2 className="cta-title style2">{cta.title1}</h2>
                            <h3 className="cta-title text-white">{cta.title2}</h3>
                        </div>
                        <div className="btn-wrap justify-content-center">
                            <Link to={cta.btnLink || "/contact"} className="btn style2">
                                {cta.btnText || "Get in Touch"} <i className="ri-arrow-right-up-line"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CTA;
