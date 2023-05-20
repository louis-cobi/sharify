import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import userApi from "../api/modules/user.api"
import { toast } from "react-toastify"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username, password) => {
        setIsLoading(true)
        setError(null)

        const { response, err } = await userApi.signin(username, password)

        if (response) {
            localStorage.setItem("user", JSON.stringify(response))
            dispatch({ type: "LOGIN", payload: response })
            setIsLoading(false)
            toast.success(`Welcome back ${response.username}`)
        }

        if (err) {
            setIsLoading(false)
            setError(err.message)
            toast.error(err.message)
        }
    }
    return { login, isLoading, error }
}
