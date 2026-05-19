import styles from "../css/Projects.module.css";
import { useState } from "react";
import TypingDisplay from "./TypingDisplay";
import {
    faSuitcase,
    faCodeCompare,
    faFish,
    faSeedling,
    type IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Project = {
    name: string;
    text: string;
    icon: IconDefinition;
};

const projects: Project[] = [
    {
        name: "Packet",
        text: `**Packet: Travel Packing Lists**
_Swift, SwiftUI_

Never forget to pack your toothpaste again! This app was inspired by my travels to and from college, and by the indie iOS devs who first showed me that you can make a career out of loving to code. _100 Days of Swift_ later, I built Packet, with features for anyone who likes to be prepared:
- **WeatherKit** and **CoreLocation** integration to show you the forecast as you decide what outfits to bring
- **SwiftData** and **CloudKit** persistence so your lists sync across all your devices
- Templates and autocomplete to make writing your list almost as chill as the vacation itself

Check out the [repo](https://github.com/asea-aranion/Packet) or [download on the app store](https://apps.apple.com/us/app/packet-travel-packing-lists/id6741205673?itscg=30200&itsct=apps_box_link&mttnsubad=6741205673)!`,
        icon: faSuitcase,
    },
    {
        name: "FoMVT Helper",
        text: `**FoMVT Helper**
_TypeScript, Expo, React Native_

I'm a _tech lead_ on this [Hack4Impact](https://umd.hack4impact.org) project team, working with the [Friends of the Mount Vernon Trail](https://mountvernontrail.org) nonprofit. We're building a cross-platform mobile app to help volunteer leaders better capture their impact on the trail.

Our app integrates with their existing **Trello**, **Google Photos**, and **Google Looker** workflow to make handoff seamless. My responsibilities include making architecture decisions (like how we'll implement **Google Maps** views next semester) and deploying **TestFlight** builds for our beta tests out on the trail!

Feel free to check out our [repo](https://github.com/Hack4Impact-UMD/mount-vernon-trail)!`,
        icon: faSeedling,
    },
    {
        name: "Commitiquette",
        text: `**Commitiquette**
_TypeScript_

We all want to find that bug-fixing, feature-implementing flow state, but what about when you look up and realize you have _500 lines changed_ across _15 files_? One best practice I've learned from my internships and TL experience is keeping commits and PRs focused and concise. That's where my idea for this **VSCode extension** comes from. Commitiquette integrates with **Git** to notify you when your number of changes goes above a certain threshold, and there are plenty of customization options to make it work for you. 

[Install Commitiquette](https://marketplace.visualstudio.com/items?itemName=asea-aranion.commitiquette&ssr=false#overview) or see [how it works](https://github.com/asea-aranion/commitiquette) behind the scenes.`,
        icon: faCodeCompare,
    },
    {
        name: "Underwater Clock",
        text: `**Underwater Clock**
_Starlark_

The **Tidbyt** is a cool little 64x32 pixel display that can show the time, sports news, smart home data, or countless other apps mostly contributed by the community on **GitHub**. I created my own to bring the serenity of the ocean to your desk or home. The scene behind the clock, with pixel art by yours truly, changes with the time of day (the coral even glows at night!). Users in the community Discord have called it _"awesome"_ and _"my favorite so far"_. 

Check out [how the magic happens](https://github.com/tidbyt/community/tree/main/apps/underwaterclock)!`,
        icon: faFish,
    },
];

const noSelectionText = `_Click a button to learn more about one of my projects._`;

interface ProjectsProps {
    setDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const Projects = ({ setDone }: ProjectsProps) => {
    const [selectedProject, setSelectedProject] = useState<number | undefined>(
        undefined,
    );

    return (
        <div className={styles.grid}>
            <div className={styles.buttonColumn}>
                {projects.map((project, index) => (
                    <button
                        key={project.name}
                        onClick={() => {
                            setDone(true);
                            setSelectedProject(index);
                        }}
                        aria-label={`${project.name}`}
                        className={`${styles.button} ${selectedProject == index && styles.selectedButton}`}>
                        <FontAwesomeIcon icon={project.icon}></FontAwesomeIcon>
                    </button>
                ))}
            </div>
            {selectedProject == undefined && (
                <TypingDisplay
                    text={noSelectionText}
                    ready={true}
                    setDone={setDone}></TypingDisplay>
            )}

            {projects.map((project, index) => {
                return (
                    <React.Fragment key={project.name}>
                        {selectedProject == index && (
                            <TypingDisplay
                                text={project.text}
                                ready={true}
                                setDone={setDone}></TypingDisplay>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Projects;
