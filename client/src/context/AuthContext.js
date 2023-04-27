import { createContext, useReducer, useEffect, useState } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload};
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const sessionUser = async() => {
            const response = await fetch("api/user/session")
            const json = await response.json()
            if(response.ok){
                localStorage.setItem("user", JSON.stringify(json))
            }
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                dispatch({ type: "LOGIN", payload: user});
            } 
            setIsLoading(false);
        }
        sessionUser()
    }, []);

    console.log("AuthContext state : ", state);
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {isLoading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};
