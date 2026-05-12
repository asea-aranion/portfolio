import { useEffect, useRef, useState } from "react";

type MarkdownTypingData = {
    workingText: string;
    displayText: string;
    lastDoubleStar: number | null;
    applyBoldNext: boolean;
};

const MS_PER_CHAR = 20;
const doubleStarPattern = /^\*\*/;
const newlinePattern = /^\n/;
const closingParenPattern = /^\)/;
const linkPattern = /\[(.*)\]\((.*)$/;

export const useMarkdownTyping = (text: string) => {
    const [data, setData] = useState<MarkdownTypingData>({
        workingText: text,
        displayText: "",
        lastDoubleStar: null,
        applyBoldNext: false,
    });

    const timer = useRef<number>(undefined);

    useEffect(() => {
        timer.current = setInterval(() => {
            setData(
                ({
                    workingText,
                    displayText,
                    lastDoubleStar,
                    applyBoldNext,
                }: MarkdownTypingData) => {
                    const updatedData: MarkdownTypingData = {
                        workingText,
                        displayText,
                        lastDoubleStar,
                        applyBoldNext,
                    };

                    if (!workingText) {
                        clearInterval(timer.current);
                        return updatedData;
                    }

                    let newDisplayText = displayText + workingText[0];

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

                    if (workingText.match(newlinePattern)) {
                        newDisplayText = displayText + "<br />";
                    } else if (workingText.match(doubleStarPattern)) {
                        if (lastDoubleStar != null) {
                            // close bolded text with tags next iteration
                            updatedData.applyBoldNext = true;
                        } else {
                            // save position
                            updatedData.lastDoubleStar = displayText.length;
                        }
                    } else if (workingText.match(closingParenPattern)) {
                        const linkMatch = displayText.match(linkPattern);
                        if (linkMatch) {
                            const startOfLink =
                                displayText.length -
                                (linkMatch[1].length + linkMatch[2].length + 3);
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
        }, MS_PER_CHAR);

        return () => clearInterval(timer.current);
    }, []);

    return { display: data.displayText };
};
