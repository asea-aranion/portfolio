import TypingDisplay from "./TypingDisplay";
import styles from "../css/Colophon.module.css";
import { useState } from "react";

const text = `This site is built with **TypeScript, Vite, React and npm** and deployed with **Render**.

The typing animations you've been seeing are created in real time by a **markdown-to-HTML** lexer/parser. It outputs each character in the input string as it reads and converts markdown syntax to HTML tags as they're closed. 

_Why this design?_
I take notes in markdown every day. I find parsing and grammars fascinating (cf. my double major!), especially when they're put to use as great features in apps like Todoist and Obsidian. One inspiration for the broader look was the _Zelda: Breath of the Wild_ inventory UI. The site is also typeset in **Space Mono**, the font I use in VSCode and Terminal. 

In all, I aimed for this site to feel like a representation of me and what I'm passionate about. So, if you thought anything you've read here was cool, definitely get in touch!`;

const Colophon = () => {
    const [show, setShow] = useState(false);
    const [headerDone, setHeaderDone] = useState(false);

    return (
        <div className={styles.colophon}>
            {show ? (
                <>
                    <div className={styles.sectionHeader}>
                        <TypingDisplay
                            text={`Colophon`}
                            ready={show}
                            setDone={setHeaderDone}></TypingDisplay>
                    </div>
                    <div className={styles.body}>
                        <TypingDisplay
                            text={text}
                            ready={headerDone}
                            setDone={() => {}}></TypingDisplay>
                    </div>
                </>
            ) : (
                <div className={styles.buttonContainer}>
                    <button
                        className={styles.button}
                        onClick={() => setShow(true)}>
                        more about this site
                    </button>
                </div>
            )}
        </div>
    );
};

export default Colophon;
