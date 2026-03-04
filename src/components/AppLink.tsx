import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import type { AppLinkProps } from "../types";

const AppLink = ({ text, href, external }: AppLinkProps) => {
    return external ? (
        <a
            href={href}
            target="blank">
            {text}{" "}
            <FontAwesomeIcon icon={faArrowUpRightFromSquare}></FontAwesomeIcon>
        </a>
    ) : (
        <Link to={href}>{text}</Link>
    );
};

export default AppLink;
