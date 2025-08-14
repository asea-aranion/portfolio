import styles from "../css/AppSection.module.css";
import type { AppSectionProps } from "../types";

const AppSection = ({ title }: AppSectionProps) => {
    return (
        <section className={styles.section}>
            <div className={styles.leftContainer}>
                <h2 className={styles.appTitle}>{title}</h2>
            </div>
        </section>
    );
};

export default AppSection;
