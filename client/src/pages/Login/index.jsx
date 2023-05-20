import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import { useNavigate } from "react-router-dom"
import BroswerCard from "../../components/common/BrowserCard"
import Title from "../../components/common/TItle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import "./index.css"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isLoading } = useLogin()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(username, password)
        if (error === null) navigate("/")
    }

    const handleGoogleAuth = async () => {
        window.open("http://localhost:5001/api/user/auth/google", "_self")
    }

    const renderLoginForm = () => {
        return (
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="login-input"
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="login-input"
                    />
                    <button
                        onClick={() => navigate("/signup")}
                        className="login-signup-link"
                    >
                        create an account
                    </button>
                    <button
                        onClick={() => navigate("/reset-password")}
                        className="login-signup-link"
                    >
                        Forgot Password
                    </button>

                    <button disabled={isLoading} className="login-form-btn">
                        Login
                    </button>
                </form>
                <div className="login-separator">or</div>
                <div className="login-google-btn-container">
                    <button
                        onClick={() => handleGoogleAuth()}
                        className="login-google-btn"
                    >
                        <FontAwesomeIcon icon={faGoogle} />
                        login with google
                    </button>
                </div>
                {error && <div>{error}</div>}
            </div>
        )
    }

    return (
        <>
            <Title text="Login" />
            <BroswerCard children={renderLoginForm()} />
        </>
    )
}

export default Login
