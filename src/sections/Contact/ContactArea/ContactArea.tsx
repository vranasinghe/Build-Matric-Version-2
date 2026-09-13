import { Link } from "react-router-dom";
import { useContent } from "../../../admin/ContentContext";

const ContactArea = () => {
  const { content } = useContent();
  const offices = content.contactPage.offices;

  return (
    <section className="contact-page-area space">
      <div className="container">
        <div className="row gy-4 justify-content-center">
          {offices.map((office, idx) => (
            <div className="col-md-6 col-lg-4" key={office.id || idx}>
              <div className="contact-page-card bg-smoke">
                <div className="contact-page-card-details">
                  <h4 className="contact-page-card_title">{office.title}</h4>
                  <div className="contact-page-card-text">
                    <i className="ri-phone-line"></i>
                    <Link
                      className="contact-page-card_link"
                      to={`tel:${office.phone.replace(/\s+/g, '')}`}
                    >
                      {office.phone}
                    </Link>
                  </div>
                  <div className="contact-page-card-text">
                    <i className="ri-mail-line"></i>
                    <Link
                      className="contact-page-card_link"
                      to={`mailto:${office.email}`}
                    >
                      {office.email}
                    </Link>
                  </div>
                  <div className="contact-page-card-text">
                    <i className="ri-time-line"></i>{office.hours}
                  </div>
                </div>
                <div className="contact-page-card-thumb">
                  <img src={office.thumb || "/assets/img/normal/contact_page1-1.png"} alt={office.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
