import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import userApi from "../api/modules/user.api";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        const { response, err } = await userApi.signup(username, email, password)

        if (response) {
            localStorage.setItem("user", JSON.stringify(response))
            dispatch({ type: "LOGIN", payload: response })
            setIsLoading(false)
        }

        if (err) {
            setIsLoading(false)
            setError(err.message)
        }
    };
    return { signup, isLoading, error };
};
