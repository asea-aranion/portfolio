import { useMarkdownTyping } from "../mdAnimation";
import styles from "../css/TypingDisplay.module.css";

interface TypingDisplayProps {
    text: string;
    ready: boolean;
    setDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const TypingDisplay = ({ text, ready, setDone }: TypingDisplayProps) => {
    const { display } = useMarkdownTyping(text, ready, setDone);

    return ready ? (
        <div
            className={styles.display}
            dangerouslySetInnerHTML={{ __html: display }}></div>
    ) : (
        <></>
    );
};

export default TypingDisplay;
