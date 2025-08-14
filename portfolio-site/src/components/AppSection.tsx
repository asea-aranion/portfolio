import {
    faArrowUpRightFromSquare,
    faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../css/AppSection.module.css";
import type { AppSectionProps } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AppSection = ({
    title,
    subtitle,
    description,
    links,
    img,
}: AppSectionProps) => {
    return (
        <section className={styles.section}>
            <div className={styles.leftContainer}>
                <h2 className={styles.appTitle}>{title}</h2>
                <h3 className={styles.appSubtitle}>
                    <FontAwesomeIcon icon={faFilePen}></FontAwesomeIcon>{" "}
                    {subtitle}
                </h3>
                <p className={styles.appDescription}>{description}</p>
                {links.map((link) => (
                    <a
                        href={link.href}
                        target="blank">
                        {link.text}{" "}
                        <FontAwesomeIcon
                            icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
                    </a>
                ))}
            </div>
            <img
                className={styles.img}
                src={img.url}
                alt={img.alt}></img>
        </section>
    );
};

export default AppSection;
