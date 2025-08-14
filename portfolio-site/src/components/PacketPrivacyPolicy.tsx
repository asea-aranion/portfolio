import { Link } from "react-router-dom";
import styles from "../css/PacketPrivacyPolicy.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const PacketPrivacyPolicy = () => {
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Link to="/">
                        <FontAwesomeIcon
                            icon={faChevronLeft}
                            size="xs"></FontAwesomeIcon>
                    </Link>{" "}
                    Packet Privacy Policy
                </h1>
                <h2 className={styles.subtitle}>Last updated 2025-08-14</h2>
            </header>

            <section className={styles.text}>
                <p>
                    Packet never gives any of your information to third parties.
                </p>
                <p>
                    When you enter data about your trips and packing lists into
                    Packet, this may be stored on your device or in iCloud, but
                    it is not accessible to anyone except you. This data is not
                    used for any purpose other than providing the app's
                    functionality. Your contact information or other
                    identifiable information is never collected.
                </p>
                <p>By using Packet, you accept the above privacy policy.</p>
            </section>
        </>
    );
};

export default PacketPrivacyPolicy;
