import AppList from "./AppList";
import Banner from "./Banner";
import { appData } from "../appData";

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <AppList apps={appData}></AppList>
        </>
    );
};

export default Home;
