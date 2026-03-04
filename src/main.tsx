import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PacketPrivacyPolicy from "./components/PacketPrivacyPolicy";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
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
    </StrictMode>,
);
