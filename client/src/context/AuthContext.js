import { createContext, useReducer, useEffect, useState } from "react"

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const sessionUser = async () => {
            const user = JSON.parse(localStorage.getItem("user"))
            if (user === null) {
                // const response = await fetch("https://sharify-api.vercel.app/api/user/session",{
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     method: 'GET'
                // })
                // const response = await fetch("https://sharify-api.vercel.app/api/user/session")
                const response = await fetch("https://sharify-api.vercel.app/api/user/auth/google/callback")
                const json = await response.json()
                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(json))
                }
            }
            const userAuthed =JSON.parse(localStorage.getItem("user"))
            const userConnected = user || userAuthed
            if (userConnected ) {
                dispatch({ type: "LOGIN", payload: userConnected })
            }
            setIsLoading(false)
        }
        sessionUser()
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )
}
