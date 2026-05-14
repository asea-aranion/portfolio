import { createRef, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PacketPrivacyPolicy from "./components/PacketPrivacyPolicy";
import TypingSpeedContext from "./components/TypingSpeedContext";

const msPerCharRef = createRef<number>();
msPerCharRef.current = 30;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <TypingSpeedContext value={msPerCharRef as React.RefObject<number>}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home></Home>}></Route>
                    <Route
                        path="packet-privacy"
                        element={
                            <PacketPrivacyPolicy></PacketPrivacyPolicy>
                        }></Route>
                </Routes>
            </BrowserRouter>
        </TypingSpeedContext>
    </StrictMode>,
);
