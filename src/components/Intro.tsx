import { useMarkdownTyping } from "../mdAnimation";
import styles from "../css/Intro.module.css";

const text = `Welcome to **Leia Spagnola**'s portfolio site (that's me!).\n\n
	Here's what I've been working on lately:\n
	- A [cross-platform mobile app](https://github.com/Hack4Impact-UMD/mount-vernon-trail) for Friends of the Mount Vernon Trail volunteers\n
	- An [iOS packing list app](https://github.com/asea-aranion/Packet) to help you travel stress-free\n
	- A [VSCode extension](https://github.com/asea-aranion/commitiquette) to notify you when your uncommitted changes are starting to look a bit hefty\n
	- A [Tidbyt app](https://github.com/tidbyt/community/tree/main/apps/underwaterclock) to bring some oceanic calm to your desk or home`;

const Intro = () => {
    const { display } = useMarkdownTyping(text);

    return (
        <div
            className={styles.display}
            dangerouslySetInnerHTML={{ __html: display }}></div>
    );
};

export default Intro;
