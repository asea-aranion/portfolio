import TypingDisplay from "./TypingDisplay";
import styles from "../css/Home.module.css";
import { useState } from "react";
import Projects from "./Projects";

const introText = `Hello, dear reader! I'm **Leia**, a rising junior studying _computer science and linguistics_ at the **University of Maryland, College Park**.`;

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

    return (
        <>
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

            {seeProjectsDone && <Projects></Projects>}
        </>
    );
};

export default Home;
