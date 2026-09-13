import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const projects = [
  {
    num: "N.01",
    title: "Breakwater, Dredging, Wharf & Reclamation Works",
    location: "Western Region, Abu Dhabi, UAE",
    image: "/assets/img/project/project2_1.png",
  },
  {
    num: "N.02",
    title: "Coastal Revetment Works",
    location: "Western Region, Abu Dhabi, UAE",
    image: "/assets/img/project/project2_2.png",
  },
  {
    num: "N.03",
    title: "Site Grading, Roads & Paving Works",
    location: "Western Region, Abu Dhabi, UAE",
    image: "/assets/img/project/project2_3.png",
  },
  {
    num: "N.04",
    title: "Composite Mid-Rise Building Development",
    location: "Western Region, Abu Dhabi, UAE",
    image: "/assets/img/project/project2_4.png",
  },
  {
    num: "N.05",
    title: "The Villa – Thematic Residential Development",
    location: "Dubai, UAE – 1,200+ villas",
    image: "/assets/img/project/project2_5.png",
  },
  {
    num: "N.06",
    title: "Al Khail Gate – Phase 1",
    location: "Dubai, UAE",
    image: "/assets/img/project/project2_6.png",
  },
  {
    num: "N.07",
    title: "DubaiLand Master Development",
    location: "Dubai, UAE",
    image: "/assets/img/project/project2_7.png",
  },
  {
    num: "N.08",
    title: "High-End Private Residential / Palace Developments",
    location: "UAE",
    image: "/assets/img/project/project2_8.png",
  },
  {
    num: "N.09",
    title: "78 storied high-rise building (mix use)",
    location: "Dubai, UAE",
    image: "/assets/img/project/project2_9.png",
  },
];

const Portfolio = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };

  return (
    <div
      id="project-sec"
      className="bg-shape background-image"
      style={{
        backgroundImage: "url('/assets/img/bg/project-bg4-1.png')",
      }}
    >
      <div className="portfolio-area-4 space-top space-bottom">
        <div className="container">
          {/* top content matching Home-4 header with Home-1 main topic */}
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-7 portfolio-extra-padding">
              <div className="title-area content-text-extra-style">
                <span className="sub-title text-theme">
                  <img
                    src="/assets/img/icon/section-subtitle-icon.svg"
                    alt="img"
                    style={{ marginRight: "8px" }}
                  />
                  Recent Projects <i className="ri-arrow-right-down-line"></i>
                </span>
                <h2 className="sec-title">Check our latest projects</h2>
                <p className="sec-text" style={{ marginTop: "10px" }}>
                  Delivering excellence across iconic developments and complex infrastructure
                </p>
              </div>
            </div>
            <div className="col-lg-auto white-space-hidden">
              <div className="sec-btn">
                <div className="icon-box">
                  <button
                    onClick={handlePrev}
                    className="slick-arrow default style2"
                    aria-label="Previous Project"
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <button
                    onClick={handleNext}
                    className="slick-arrow default style2"
                    aria-label="Next Project"
                  >
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Slider matching Home-4 portfolio-card style4 */}
          <div className="extra-space-top">
            <Slider
              {...settings}
              ref={sliderRef}
              className="row gy-30 gx-30 global-carousel portfolio-slider4"
            >
              {projects.map((project, index) => (
                <div className="col-lg-4" key={index}>
                  <div
                    className="portfolio-card style4"
                    style={{ margin: "0 10px" }}
                  >
                    <div className="portfolio-card-thumb">
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{
                          width: "100%",
                          height: "460px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="portfolio-card-number">
                        {project.num}
                      </span>
                    </div>
                    <div
                      className="portfolio-card-details"
                      style={{ width: "88%", maxWidth: "340px" }}
                    >
                      <span className="portfolio-card-subtitle">
                        {project.location}
                      </span>
                      <h4
                        className="portfolio-card-title"
                        style={{
                          whiteSpace: "normal",
                          fontSize: "20px",
                          lineHeight: "1.3",
                        }}
                      >
                        <Link to="/project-details">{project.title}</Link>
                      </h4>
                    </div>
                    <Link to="/project-details" className="icon-btn">
                      <i className="ri-arrow-right-line"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
