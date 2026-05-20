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

const doubleStarPattern = /^\*\*/; // opens and closes bold text
const underscorePattern = /^_/; // opens and closes italicized text
const bulletPattern = /^\n- /; // starts a list item (and closes previous, etc.)
const newlinePattern = /^\n/; // inserts a line break (single newline is enough to trigger for simplicity)
const closingParenPattern = /^\)/; // prompts check for preceding link syntax
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

    // reference to the interval so it can be cleared
    const timer = useRef<number>(undefined);

    const msPerChar = useContext(TypingSpeedContext);

    useEffect(() => {
        // clear old interval if speed changed
        clearInterval(timer.current);

        if (readyToStart) {
            timer.current = setInterval(() => {
                // update text in setState callback to avoid
                // concurrency issues
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
                        // create new object to modify and return
                        const updatedData: MarkdownTypingData = {
                            workingText,
                            displayText,
                            lastDoubleStar,
                            lastUnderscore,
                            lastBullet,
                            applyListItemIn,
                            applyBoldNext,
                        };

                        // reached end of input
                        if (!workingText) {
                            clearInterval(timer.current);
                            setDone(true);
                            return updatedData;
                        }

                        // base case: print next character
                        let newDisplayText = displayText + workingText[0];

                        // check for list item flag
                        if (applyListItemIn != null) {
                            if (applyListItemIn > 0) {
                                // count down chars until list item pattern
                                // has been printed and will be replaced
                                updatedData.applyListItemIn =
                                    applyListItemIn - 1;
                            } else {
                                // replace markdown list bullet with li tag
                                const textBeforeListItem =
                                    displayText.substring(0, lastBullet!);

                                newDisplayText =
                                    `${textBeforeListItem}<li>` +
                                    workingText[0];
                                // ensures any indices saved later this iteration
                                // will be correct
                                displayText = `${textBeforeListItem}<li>`;
                                updatedData.applyListItemIn = null;
                            }
                        }

                        // check for bold flag
                        if (applyBoldNext) {
                            // replace markdown asterisks with b tag
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

                        // start regular lexing/parsing of next character
                        if (workingText.match(bulletPattern)) {
                            if (lastBullet != null) {
                                // close previous list item before opening a new one
                                newDisplayText = displayText + "</li>";
                            } else {
                                // open list and list item
                                newDisplayText = displayText + "<ul>";
                            }
                            // li tag will be added after rest of markdown bullet
                            // has been printed
                            updatedData.applyListItemIn = 2;
                            updatedData.lastBullet = newDisplayText.length;
                        } else if (workingText.match(newlinePattern)) {
                            if (lastBullet != null) {
                                // close list item and list
                                // we've already checked that we're not starting a new list item
                                newDisplayText = displayText + "</li></ul>";
                            } else {
                                // standard newline
                                newDisplayText = displayText + "<br />";
                            }
                        } else if (workingText.match(doubleStarPattern)) {
                            if (lastDoubleStar != null) {
                                // close bolded text with tags after asterisk has been printed
                                updatedData.applyBoldNext = true;
                            } else {
                                // save position of starting syntax
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
                                // save position of starting syntax
                                updatedData.lastUnderscore = displayText.length;
                            }
                        } else if (workingText.match(closingParenPattern)) {
                            // check if this closes a markdown link
                            const linkMatch = displayText.match(linkPattern);
                            if (linkMatch) {
                                // replace with a tag
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

                        // replace display with any modifications made
                        updatedData.displayText = newDisplayText;
                        // consume character
                        updatedData.workingText = workingText.substring(1);

                        // update state
                        return updatedData;
                    },
                );
            }, msPerChar.current);
        }

        // clear timer on unmount
        return () => clearInterval(timer.current);
    }, [msPerChar.current, setDone, readyToStart]);

    return { display: data.displayText };
};
