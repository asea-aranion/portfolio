import { useMarkdownTyping } from "../mdAnimation";
import styles from "../css/Intro.module.css";
import { useState } from "react";

const text = `Hello, dear reader! I'm **Leia**, a rising junior studying _computer science and linguistics_ at the **University of Maryland, College Park**.

Other things I've been working on lately:
- A [cross-platform mobile app](https://github.com/Hack4Impact-UMD/mount-vernon-trail) for Friends of the Mount Vernon Trail volunteers
- An [iOS packing list app](https://github.com/asea-aranion/Packet) to help you travel stress-free
- A [VSCode extension](https://github.com/asea-aranion/commitiquette) to notify you when your uncommitted changes are starting to look a bit hefty
- A [Tidbyt app](https://github.com/tidbyt/community/tree/main/apps/underwaterclock) to bring some oceanic calm to your desk or home`;

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
