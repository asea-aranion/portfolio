import styles from "../css/AppSection.module.css";
import type { AppSectionProps } from "../types";

const AppSection = ({
    title,
    subtitle,
    description,
    links,
}: AppSectionProps) => {
    return (
        <section className={styles.section}>
            <div className={styles.leftContainer}>
                <h2 className={styles.appTitle}>{title}</h2>
                <h3 className={styles.appSubtitle}>{subtitle}</h3>
                <p className={styles.appDescription}>{description}</p>
                {links.map((link) => (
                    <a
                        href={link.href}
                        target="blank">
                        {link.text}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default AppSection;
