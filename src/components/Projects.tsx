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

type Project = {
    text: string;
    icon: IconDefinition;
};

const projects: Project[] = [
    {
        text: `**Packet: Travel Packing Lists**
_Swift, SwiftUI_

Never forget to pack your toothpaste again! This app was inspired by my travels to and from college, and by the indie iOS devs who first showed me that programming can be fun and a career. _100 Days of Swift_ later, I made Packet, with some features I think all travelers will find handy:
- WeatherKit and CoreLocation integration to show you the forecast as you decide what outfits to bring
- SwiftData and CloudKit persistence so your lists sync across all your devices
- Templates and autocomplete to make writing your list almost as chill as the vacation itself

Check out the [repo](https://github.com/asea-aranion/Packet) or [download on the app store](https://apps.apple.com/us/app/packet-travel-packing-lists/id6741205673?itscg=30200&itsct=apps_box_link&mttnsubad=6741205673)!`,
        icon: faSuitcase,
    },
    {
        text: `**FoMVT Helper**
		_TypeScript, Expo, React Native_
		A [cross-platform mobile app](https://github.com/Hack4Impact-UMD/mount-vernon-trail) for Friends of the Mount Vernon Trail volunteers`,
        icon: faSeedling,
    },
    {
        text: `**Commitiquette**
		_TypeScript_
		A [VSCode extension](https://github.com/asea-aranion/commitiquette) to notify you when your uncommitted changes are starting to look a bit hefty`,
        icon: faCodeCompare,
    },
    {
        text: `**Underwater Clock**
		_Starlark_
		A [Tidbyt app](https://github.com/tidbyt/community/tree/main/apps/underwaterclock) to bring some oceanic calm to your desk or home`,
        icon: faFish,
    },
];

const noSelectionText = `_Click a button to learn more about one of my projects._`;

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<number | undefined>(
        undefined,
    );
    const [, setDone] = useState(false);

    return (
        <div className={styles.grid}>
            <div className={styles.buttonColumn}>
                {projects.map((project, index) => (
                    <>
                        <button
                            onClick={() => setSelectedProject(index)}
                            className={`${styles.button} ${selectedProject == index && styles.selectedButton}`}>
                            <FontAwesomeIcon
                                icon={project.icon}></FontAwesomeIcon>
                        </button>
                    </>
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
                    <>
                        {selectedProject == index && (
                            <TypingDisplay
                                text={project.text}
                                ready={true}
                                setDone={setDone}></TypingDisplay>
                        )}
                    </>
                );
            })}
        </div>
    );
};

export default Projects;
