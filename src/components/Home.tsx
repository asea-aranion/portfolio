import TypingDisplay from "./TypingDisplay";
import styles from "../css/Home.module.css";
import { useContext, useState } from "react";
import Projects from "./Projects";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faFastForward } from "@fortawesome/free-solid-svg-icons";
import TypingSpeedContext from "./TypingSpeedContext";
import Colophon from "./Colophon";

const introText = `Hello, dear reader! I'm **Leia**, a rising junior studying _computer science_ and _linguistics_ at the **University of Maryland, College Park**.`;

const contactsText = `Find me on:
- [linkedin](https://www.linkedin.com/in/leia-spagnola/)
- [github](https://github.com/asea-aranion)`;

const experienceText = `This summer I'm at **Meta** for the second time as a _software engineering intern_. I've also worked for UMD's **student union** as a _web developer_.`;

const seeProjectsText = `What I've been working on lately:`;

const Home = () => {
    const [introDone, setIntroDone] = useState(false);
    const [experienceDone, setExperienceDone] = useState(false);
    const [contactsDone, setContactsDone] = useState(false);
    const [seeProjectsDone, setSeeProjectsDone] = useState(false);
    const [projectsDone, setProjectsDone] = useState(false);

    const msPerChar = useContext(TypingSpeedContext);

    return (
        <>
            <div className={styles.speedControlsContainer}>
                <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                <div className={styles.rangeContainer}>
                    <input
                        type="range"
                        step="any"
                        className={styles.rangeInput}
                        min={5}
                        max={65}
                        defaultValue={msPerChar.current}
                        onChange={(e) =>
                            (msPerChar.current = e.target
                                .value as unknown as number)
                        }></input>
                </div>
                <FontAwesomeIcon icon={faFastForward}></FontAwesomeIcon>
            </div>
            <div className={styles.content}>
                <div className={styles.introContainer}>
                    <TypingDisplay
                        text={introText}
                        ready={true}
                        setDone={setIntroDone}></TypingDisplay>
                </div>
                <div className={styles.grid}>
                    <TypingDisplay
                        text={experienceText}
                        ready={introDone}
                        setDone={setExperienceDone}></TypingDisplay>
                    <div>
                        <div className={styles.spacer}></div>
                        <TypingDisplay
                            text={contactsText}
                            ready={experienceDone}
                            setDone={setContactsDone}></TypingDisplay>
                    </div>
                </div>
                <div className={styles.sectionHeader}>
                    <TypingDisplay
                        text={seeProjectsText}
                        ready={contactsDone}
                        setDone={setSeeProjectsDone}></TypingDisplay>
                </div>

                {seeProjectsDone && (
                    <Projects setDone={setProjectsDone}></Projects>
                )}

                {projectsDone && <Colophon></Colophon>}
            </div>
        </>
    );
};

export default Home;
