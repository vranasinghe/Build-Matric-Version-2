import React from "react";
import { Link } from "react-router-dom";
import { useContent } from "../ContentContext";

interface SectionCard {
  title: string;
  headerTag: string;
  route: string;
  adminTab: string;
  icon: string;
  description: string;
  itemsCount: string;
}

const AdminDashboard: React.FC = () => {
  const { content, lastSaved, exportJSON } = useContent();

  const sections: SectionCard[] = [
    {
      title: "Header & Topbar",
      headerTag: "Header",
      route: "/",
      adminTab: "header",
      icon: "ri-layout-top-line",
      description: "Edit topbar contacts, working hours, location, navigation menu links, language switcher, region, and socials.",
      itemsCount: `${content.header.navLinks.length} Nav Links, ${content.header.socialLinks.length} Socials`,
    },
    {
      title: "Home",
      headerTag: "Home",
      route: "/",
      adminTab: "home",
      icon: "ri-home-4-line",
      description: "Manage Hero Slider banner slides, Counter Statistics, About Teaser Highlights, and Renovation CTA banner.",
      itemsCount: `${content.homeHero.length} Slides, ${content.homeCounter.length} Stats, ${content.homeAbout.checklist.length} Highlights`,
    },
    {
      title: "About",
      headerTag: "About",
      route: "/about",
      adminTab: "about",
      icon: "ri-information-line",
      description: "Manage page banner, company story, 40+ years experience badge, mission & vision, Why Choose Us, and process steps.",
      itemsCount: `${content.aboutPage.whyChooseCards.length} Cards, ${content.aboutPage.processSteps.length} Steps`,
    },
    {
      title: "Services",
      headerTag: "Services",
      route: "/service",
      adminTab: "services",
      icon: "ri-tools-line",
      description: "Manage Main Service Cards, Deliverables, 4 Process Benefits (01-04), and In-Depth Service Detail Articles.",
      itemsCount: `${content.servicesPage.services.length} Cards, ${content.serviceDetailsList.length} Service Detail Articles`,
    },
    {
      title: "Projects",
      headerTag: "Projects",
      route: "/project",
      adminTab: "projects",
      icon: "ri-building-line",
      description: "Manage Showcase Portfolio Project Cards, Technical Specifications, and Detailed Case Study Features.",
      itemsCount: `${content.projectsPage.projects.length} Projects, ${content.projectDetails.specs.length} Specifications`,
    },
    {
      title: "Contact",
      headerTag: "Contact",
      route: "/contact",
      adminTab: "contact",
      icon: "ri-contacts-book-2-line",
      description: "Edit global office locations (Sri Lanka, UAE, London), inquiry form text, button text, and map embed.",
      itemsCount: `${content.contactPage.offices.length} Global Offices`,
    },
    {
      title: "Global Footer",
      headerTag: "Footer",
      route: "/",
      adminTab: "footer",
      icon: "ri-layout-bottom-line",
      description: "Update company bio, quick navigation links, contact points, operating hours, and copyright declaration.",
      itemsCount: `${content.footer.quickLinks.length} Quick Links, Copyright Notice`,
    },
    {
      title: "Backup & Sync",
      headerTag: "Data Sync",
      route: "/admin?tab=backup",
      adminTab: "backup",
      icon: "ri-database-2-line",
      description: "Download JSON backups of all website content, import restore files, or reset to original factory state.",
      itemsCount: "JSON Export / Import",
    },
  ];

  return (
    <div>
      {/* Top Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #001F5B 0%, #0c1527 100%)",
          color: "#ffffff",
          padding: "30px 35px",
          borderLeft: "6px solid #f15a24",
          marginBottom: "35px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: "rgba(241, 90, 36, 0.2)",
              color: "#f15a24",
              fontWeight: 700,
              fontSize: "12px",
              padding: "4px 10px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            BuildMetric CMS Engine
          </span>
          <h1 style={{ fontSize: "28px", fontWeight: 700, margin: "0 0 8px 0", color: "#fff" }}>
            Component & Section Management
          </h1>
          <p style={{ margin: 0, color: "rgba(255, 255, 255, 0.75)", fontSize: "15px", maxWidth: "680px" }}>
            Directly edit every single component and content block across all header sections of the BuildMetric website.
            Changes are saved live and take immediate effect.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={exportJSON}
            style={{
              backgroundColor: "#f15a24",
              color: "#fff",
              border: "none",
              padding: "12px 22px",
              fontWeight: 700,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              letterSpacing: "0.5px",
              borderRadius: "0",
            }}
          >
            <i className="ri-download-2-line" style={{ fontSize: "16px" }} />
            Export Backup (.json)
          </button>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "12px 22px",
              fontWeight: 700,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              borderRadius: "0",
            }}
          >
            <i className="ri-external-link-line" style={{ fontSize: "16px" }} />
            View Live Site
          </Link>
        </div>
      </div>

      {/* Quick Summary Bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            border: "1px solid #e7e8ec",
            borderTop: "3px solid #001F5B",
          }}
        >
          <div style={{ color: "#686e7d", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>
            Total Sections
          </div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#001F5B", marginTop: "4px" }}>
            9 Header Areas
          </div>
          <div style={{ fontSize: "12px", color: "#9aa0ac", marginTop: "4px" }}>All site pages covered</div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            border: "1px solid #e7e8ec",
            borderTop: "3px solid #f15a24",
          }}
        >
          <div style={{ color: "#686e7d", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>
            Services Configured
          </div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#f15a24", marginTop: "4px" }}>
            {content.servicesPage.services.length} Specialized
          </div>
          <div style={{ fontSize: "12px", color: "#9aa0ac", marginTop: "4px" }}>With {content.serviceDetailsList.length} rich articles</div>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            border: "1px solid #e7e8ec",
            borderTop: "3px solid #008060",
          }}
        >
          <div style={{ color: "#686e7d", fontSize: "12px", fontWeight: 700, textTransform: "uppercase" }}>
            System Persistence
          </div>
          <div style={{ fontSize: "28px", fontWeight: 700, color: "#008060", marginTop: "4px" }}>
            Live Sync
          </div>
          <div style={{ fontSize: "12px", color: "#9aa0ac", marginTop: "4px" }}>
            {lastSaved ? `Last saved: ${lastSaved.toLocaleTimeString()}` : "Ready for edits"}
          </div>
        </div>
      </div>

      {/* Grid of All Header Sections */}
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#001F5B", marginBottom: "18px" }}>
        Select a Header Section to Edit Components
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {sections.map((sec) => (
          <div
            key={sec.adminTab}
            style={{
              background: "#ffffff",
              border: "1px solid #e7e8ec",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <span
                  style={{
                    backgroundColor: "#f4f5f7",
                    color: "#001F5B",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 8px",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {sec.headerTag}
                </span>
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "rgba(0, 31, 91, 0.06)",
                    color: "#001F5B",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                  }}
                >
                  <i className={sec.icon} />
                </span>
              </div>

              <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#141d30", margin: "0 0 8px 0" }}>
                {sec.title}
              </h3>

              <p style={{ color: "#686e7d", fontSize: "13px", lineHeight: "1.6", margin: "0 0 14px 0" }}>
                {sec.description}
              </p>

              <div
                style={{
                  fontSize: "12px",
                  color: "#001F5B",
                  fontWeight: 600,
                  backgroundColor: "#fbfbfc",
                  padding: "6px 10px",
                  borderLeft: "2px solid #001F5B",
                  marginBottom: "20px",
                }}
              >
                {sec.itemsCount}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                to={`/admin?tab=${sec.adminTab}`}
                style={{
                  flex: 1,
                  backgroundColor: "#001F5B",
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "10px 16px",
                  fontSize: "13px",
                  fontWeight: 700,
                  textAlign: "center",
                  letterSpacing: "0.5px",
                  display: "inline-block",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f15a24")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#001F5B")}
              >
                Edit Components
              </Link>
              {sec.adminTab !== "backup" && (
                <Link
                  to={sec.route}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Live Page"
                  style={{
                    width: "42px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #e7e8ec",
                    color: "#686e7d",
                    textDecoration: "none",
                    fontSize: "16px",
                  }}
                >
                  <i className="ri-external-link-line" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
