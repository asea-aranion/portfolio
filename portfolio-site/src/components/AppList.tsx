import styles from "../css/AppList.module.css";
import type { AppSectionProps } from "../types";
import AppSection from "./AppSection";

interface AppListProps {
    apps: AppSectionProps[];
}

const AppList = ({ apps }: AppListProps) => {
    return (
        <section className={styles.container}>
            {apps.map((appData) => (
                <AppSection title={appData.title}></AppSection>
            ))}
        </section>
    );
};

export default AppList;
