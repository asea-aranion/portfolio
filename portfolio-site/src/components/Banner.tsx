import styles from "../css/Banner.module.css";

const Banner = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>apps by leia spagnola</h1>
            <a
                className={styles.subtitle}
                href="https://github.com/asea-aranion"
                target="blank">
                asea-aranion on github
            </a>
        </header>
    );
};

export default Banner;
