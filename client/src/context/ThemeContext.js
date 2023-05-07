import { createContext, useReducer } from "react"

export const ThemeContext = createContext()

const initialState = { darkMode: false }

export const toggleThemeReducer = (state, action) => {
    switch (action.type) {
        case "LIGHTMODE":
            return { darkMode: false }
        case "DARKMODE":
            return { darkMode: true }
        default:
            return state
    }
}

export const ThemeContextProvider = ({ children }) => {
    const [themeState, dispatch] = useReducer(toggleThemeReducer, initialState)

    console.log("ToggleModeContext:", themeState)
    return (
        <ThemeContext.Provider value={{ ...themeState, dispatch }}>
            {children}
        </ThemeContext.Provider>
    )
}
