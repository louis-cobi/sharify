import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isLoading } = useLogin()
    const navigate = useNavigate()

    const { dispatch } = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
        navigate("/")
    }

    const handleGoogleAuth = async () => {
        // const response = await fetch("/api/user/auth/google", {
        //     credentials: 'include',
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Credentials": true,
        //         "Access-Control-Allow-Origin": true
        //       }
        //   })
        // const json = await response.json()
        // if (response.ok) {
        //     localStorage.setItem("user", JSON.stringify(json))

        //     dispatch({ type: "LOGIN", payload: json })
        // }
            window.open("http://localhost:5001/api/user/auth/google", "_self");
    }

    return (
        <>
            <form className="signup" onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label>Username:</label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button disabled={isLoading}>Login</button>

                <button onClick={() => navigate("/signup")}>register</button>

                {error && <div>{error}</div>}
            </form>

            <button onClick={() => handleGoogleAuth()}>google</button>
        </>
    )
}

export default Login
