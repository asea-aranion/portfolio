import { useMarkdownTyping } from "../mdAnimation";
import styles from "../css/BasicDisplay.module.css";
import { useState } from "react";

const text = `Hello, dear reader! I'm **Leia**, a rising junior studying _computer science and linguistics_ at the **University of Maryland, College Park**.

This summer I'm returning to **Meta** as a _software engineering intern_. I've also worked for UMD's **student union** as a _web developer_.`;

const Intro = () => {
    const [, setDone0] = useState(false);

    const { display } = useMarkdownTyping(text, true, setDone0);

    return (
        <div
            className={styles.display}
            dangerouslySetInnerHTML={{ __html: display }}></div>
    );
};

export default Intro;
