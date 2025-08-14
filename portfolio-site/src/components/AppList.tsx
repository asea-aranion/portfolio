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
                <AppSection
                    title={appData.title}
                    subtitle={appData.subtitle}
                    description={appData.description}
                    links={appData.links}
                    img={appData.img}></AppSection>
            ))}
        </section>
    );
};

export default AppList;
