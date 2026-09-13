import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useContent } from "../../../admin/ContentContext";

const CounterOne = () => {
    const { content } = useContent();
    const counters = content.homeCounter;

    const { ref: counterRef, inView: counterInView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const defaultIcons = [
        "ri-funds-line",
        "ri-building-line",
        "ri-community-line",
        "ri-award-line",
    ];

    return (
        <section
            className="buildmetric-counter-section"
            ref={counterRef}
            style={{
                position: "relative",
                zIndex: 15,
                marginTop: "-75px",
                marginBottom: "35px",
                padding: "0 15px",
            }}
        >
            <style>{`
                .buildmetric-counter-box {
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 16px 40px -10px rgba(15, 23, 42, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
                    border: 1px solid #e7eaee;
                    padding: 34px 28px;
                    position: relative;
                }
                .buildmetric-counter-col {
                    position: relative;
                    border-right: 1px solid #edf0f4;
                    padding: 6px 20px;
                    transition: all 0.25s ease;
                }
                .buildmetric-counter-col:last-child {
                    border-right: none;
                }
                .buildmetric-counter-card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .buildmetric-counter-card:hover .counter-icon-badge {
                    background-color: #f15a24 !important;
                    color: #ffffff !important;
                    transform: translateY(-2px);
                }
                .counter-number-val {
                    font-size: 44px;
                    font-weight: 800;
                    color: #0c1427;
                    font-family: var(--title-font, "Titillium Web", sans-serif);
                    line-height: 1.1;
                    margin: 12px 0 6px 0;
                    display: flex;
                    align-items: baseline;
                    letter-spacing: -0.02em;
                }
                .counter-label-title {
                    font-size: 15.5px;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 5px;
                    line-height: 1.35;
                    font-family: "Titillium Web", sans-serif;
                }
                .counter-sublabel-text {
                    font-size: 12.5px;
                    color: #64748b;
                    line-height: 1.45;
                    margin: 0;
                    font-family: var(--body-font, sans-serif);
                }
                @media (max-width: 991px) {
                    .buildmetric-counter-section {
                        margin-top: -25px !important;
                        margin-bottom: 25px !important;
                    }
                    .buildmetric-counter-box {
                        padding: 24px 18px !important;
                    }
                    .buildmetric-counter-col {
                        border-right: none !important;
                        border-bottom: 1px solid #edf0f4 !important;
                        padding-bottom: 18px !important;
                        margin-bottom: 12px !important;
                    }
                    .buildmetric-counter-col:last-child {
                        border-bottom: none !important;
                        margin-bottom: 0 !important;
                        padding-bottom: 0 !important;
                    }
                    .counter-number-val {
                        font-size: 36px !important;
                    }
                }
            `}</style>
            <div className="container">
                <div className="buildmetric-counter-box">
                    <div className="row g-0 align-items-stretch">
                        {counters.map((c, index) => {
                            const iconClass = c.icon || defaultIcons[index % defaultIcons.length];
                            return (
                                <div
                                    className="col-xl-3 col-lg-3 col-md-6 col-12 buildmetric-counter-col"
                                    key={c.id || index}
                                >
                                    <div className="buildmetric-counter-card">
                                        {/* Icon badge & Number Index */}
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div
                                                className="counter-icon-badge"
                                                style={{
                                                    width: "42px",
                                                    height: "42px",
                                                    borderRadius: "8px",
                                                    backgroundColor: "rgba(241, 90, 36, 0.08)",
                                                    color: "#f15a24",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    fontSize: "20px",
                                                    transition: "all 0.25s ease",
                                                }}
                                            >
                                                <i className={iconClass} />
                                            </div>
                                            <span
                                                style={{
                                                    fontSize: "11px",
                                                    fontWeight: 700,
                                                    letterSpacing: "1px",
                                                    color: "#cbd5e1",
                                                    fontFamily: "'Titillium Web', sans-serif",
                                                }}
                                            >
                                                0{index + 1}
                                            </span>
                                        </div>

                                        {/* Number Display */}
                                        <div className="counter-number-val">
                                            {c.prefix && (
                                                <span style={{ color: "#f15a24", fontSize: "32px", fontWeight: 700, marginRight: "1px" }}>
                                                    {c.prefix}
                                                </span>
                                            )}
                                            <span>
                                                {counterInView ? <CountUp start={0} end={c.number} duration={2} /> : c.number}
                                            </span>
                                            {c.suffix && (
                                                <span style={{ color: "#f15a24", fontSize: "32px", fontWeight: 700, marginLeft: "1px" }}>
                                                    {c.suffix}
                                                </span>
                                            )}
                                        </div>

                                        {/* Primary Label */}
                                        <h4 className="counter-label-title">
                                            {c.label}
                                        </h4>

                                        {/* Sublabel / Consultancy Detail */}
                                        {c.sublabel && (
                                            <p className="counter-sublabel-text">
                                                {c.sublabel}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CounterOne;