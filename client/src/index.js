import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { AuthContextProvider } from "./context/AuthContext"
import { ThemeContextProvider } from "./context/ThemeContext"
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <ThemeContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </ThemeContextProvider>
    </React.StrictMode>
)

serviceWorkerRegistration.register();

reportWebVitals()
