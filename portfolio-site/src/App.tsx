import AppList from "./components/AppList";
import Banner from "./components/Banner";
import { appData } from "./appData";

function App() {
    return (
        <>
            <Banner></Banner>
            <AppList apps={appData}></AppList>
        </>
    );
}

export default App;
