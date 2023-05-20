import { createContext, useReducer, useEffect } from "react"

export const ThemeContext = createContext()

const initialState = { darkMode: false }

export const toggleThemeReducer = (state, action) => {
    switch (action.type) {
        case "LIGHTMODE":
            localStorage.setItem("darkMode", "false")
            return { darkMode: false }
        case "DARKMODE":
            localStorage.setItem("darkMode", "true")
            return { darkMode: true }
        default:
            return state
    }
}

export const ThemeContextProvider = ({ children }) => {
    const [themeState, dispatch] = useReducer(toggleThemeReducer, initialState)
    useEffect(() => {
        const storedTheme = localStorage.getItem("darkMode");
        if (storedTheme === "true") {
          dispatch({ type: "DARKMODE" });
          document.documentElement.classList.add("darkMode");
        } else {
          dispatch({ type: "LIGHTMODE" });
          document.documentElement.classList.remove("darkMode");
        }
      }, []);
    return (
        <ThemeContext.Provider value={{ ...themeState, dispatch }}>
            {children}
        </ThemeContext.Provider>
    )
}
