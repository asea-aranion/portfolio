import { useState } from "react";
import styles from "../css/Banner.module.css";
import { useMarkdownTyping } from "../mdAnimation";

const text = `[linkedin](https://www.linkedin.com/in/leia-spagnola/) or [github](https://github.com/asea-aranion)`;

const Banner = () => {
    const [, setDone0] = useState(false);

    const { display } = useMarkdownTyping(text, true, setDone0);

    return (
        <header className={styles.header}>
            <div
                className={styles.display}
                dangerouslySetInnerHTML={{ __html: display }}></div>
        </header>
    );
};

export default Banner;
