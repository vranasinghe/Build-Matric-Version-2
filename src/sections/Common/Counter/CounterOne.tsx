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
    return (
        <div
            className="counter-area-1"
            ref={counterRef}
            style={{ paddingTop: "75px", paddingBottom: "15px" }}
        >
            <div className="container">
                <div className="row justify-content-between gy-40">
                    {counters.map((c, index) => (
                        <div className="col-auto" key={c.id || index}>
                            <div className="counter-card">
                                <h2 className="counter-card_number">
                                    <span className="counter-number">
                                        {counterInView && <CountUp start={0} end={c.number} />}
                                    </span>
                                    {c.suffix}
                                </h2>
                                <p className="counter-card_text">{c.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CounterOne;