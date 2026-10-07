import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>
);