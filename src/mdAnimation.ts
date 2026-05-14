import { useContext, useEffect, useRef, useState } from "react";
import TypingSpeedContext from "./components/TypingSpeedContext";

type MarkdownTypingData = {
    workingText: string;
    displayText: string;
    lastDoubleStar: number | null;
    lastUnderscore: number | null;
    lastBullet: number | null;
    applyListItemIn: number | null;
    applyBoldNext: boolean;
};

export const MS_PER_CHAR = 30;

const doubleStarPattern = /^\*\*/;
const underscorePattern = /^_/;
const bulletPattern = /^\n- /;
const newlinePattern = /^\n/;
const closingParenPattern = /^\)/;
const linkPattern = /\[(.*)\]\((.*)$/;

export const useMarkdownTyping = (
    text: string,
    readyToStart: boolean,
    setDone: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const [data, setData] = useState<MarkdownTypingData>({
        workingText: text,
        displayText: "",
        lastDoubleStar: null,
        lastUnderscore: null,
        lastBullet: null,
        applyListItemIn: null,
        applyBoldNext: false,
    });

    const timer = useRef<number>(undefined);

	const msPerChar = useContext(TypingSpeedContext);

    useEffect(() => {
		clearInterval(timer.current);

        if (readyToStart) {
            timer.current = setInterval(() => {
                setData(
                    ({
                        workingText,
                        displayText,
                        lastDoubleStar,
                        lastUnderscore,
                        lastBullet,
                        applyListItemIn,
                        applyBoldNext,
                    }: MarkdownTypingData) => {
                        const updatedData: MarkdownTypingData = {
                            workingText,
                            displayText,
                            lastDoubleStar,
                            lastUnderscore,
                            lastBullet,
                            applyListItemIn,
                            applyBoldNext,
                        };

                        if (!workingText) {
                            clearInterval(timer.current);
                            setDone(true);
                            return updatedData;
                        }

                        let newDisplayText = displayText + workingText[0];

                        if (applyListItemIn != null) {
                            if (applyListItemIn > 0) {
                                updatedData.applyListItemIn =
                                    applyListItemIn - 1;
                            } else {
                                const textBeforeListItem =
                                    displayText.substring(0, lastBullet!);

                                newDisplayText =
                                    `${textBeforeListItem}<li>` +
                                    workingText[0];
                                updatedData.applyListItemIn = null;
                            }
                        }

                        if (applyBoldNext) {
                            const textBeforeBold = displayText.substring(
                                0,
                                lastDoubleStar!,
                            );
                            const boldedText = displayText.substring(
                                lastDoubleStar! + 2,
                                displayText.length - 1,
                            );

                            newDisplayText = `${textBeforeBold}<b>${boldedText}</b>`;
                            updatedData.lastDoubleStar = null;
                            updatedData.applyBoldNext = false;
                        }

                        if (workingText.match(bulletPattern)) {
                            if (lastBullet != null) {
                                // close previous list item and open a new one
                                newDisplayText = displayText + "</li>";
                            } else {
                                // open list and list item
                                newDisplayText = displayText + "<ul>";
                            }
                            updatedData.applyListItemIn = 2;
                            updatedData.lastBullet = newDisplayText.length;
                        } else if (workingText.match(newlinePattern)) {
                            if (lastBullet != null) {
                                // close list item and list
                                // we've already checked that we're not starting a new list item
                                newDisplayText = displayText + "</li></ul>";
                            } else {
                                newDisplayText = displayText + "<br />";
                            }
                        } else if (workingText.match(doubleStarPattern)) {
                            if (lastDoubleStar != null) {
                                // close bolded text with tags next iteration
                                updatedData.applyBoldNext = true;
                            } else {
                                // save position
                                updatedData.lastDoubleStar = displayText.length;
                            }
                        } else if (workingText.match(underscorePattern)) {
                            if (lastUnderscore != null) {
                                // close italicized text with tags
                                const textBeforeItalics = displayText.substring(
                                    0,
                                    lastUnderscore,
                                );
                                const italicizedText = displayText.substring(
                                    lastUnderscore + 1,
                                );

                                newDisplayText = `${textBeforeItalics}<i>${italicizedText}</i>`;
                                updatedData.lastUnderscore = null;
                            } else {
                                // save position
                                updatedData.lastUnderscore = displayText.length;
                            }
                        } else if (workingText.match(closingParenPattern)) {
                            const linkMatch = displayText.match(linkPattern);
                            if (linkMatch) {
                                const startOfLink =
                                    displayText.length -
                                    (linkMatch[1].length +
                                        linkMatch[2].length +
                                        3);
                                const textBeforeLink = displayText.substring(
                                    0,
                                    startOfLink,
                                );
                                newDisplayText = `${textBeforeLink}<a href="${linkMatch[2]}" target="_blank">${linkMatch[1]}</a>`;
                            }
                        }

                        updatedData.displayText = newDisplayText;
                        updatedData.workingText = workingText.substring(1);

                        return updatedData;
                    },
                );
            }, msPerChar.current);
        }

        return () => clearInterval(timer.current);
    }, [msPerChar.current, setDone, readyToStart]);

    return { display: data.displayText };
};
