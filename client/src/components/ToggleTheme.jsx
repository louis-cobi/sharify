
import { useThemeContext } from "../hooks/useThemeContext";
import ThemeButton from "./ThemeButton";


function ToggleTheme() {
    const { darkMode, dispatch } = useThemeContext();

    const handleSwitch = () => {
        if (darkMode) {
            dispatch({ type: "LIGHTMODE" });
            document.documentElement.classList.remove("darkMode");
        } else {
            dispatch({ type: "DARKMODE" });
            document.documentElement.classList.add("darkMode");
        }

    };

    return (
        <div className="toggle-mode">
                <input type="checkbox" id="toggle-mode" checked={darkMode ? true : false} onChange={handleSwitch} />
                <button onClick={handleSwitch}>
                    <ThemeButton />
                </button>
        </div>
    );
}

export default ToggleTheme;