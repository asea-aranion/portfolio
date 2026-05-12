import Banner from "./Banner";
import Intro from "./Intro";
import styles from "../css/Home.module.css";
import Projects from "./Projects";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <div className={styles.grid}>
                <Intro></Intro>
                <Projects></Projects>
            </div>
        </>
    );
};

export default Home;
