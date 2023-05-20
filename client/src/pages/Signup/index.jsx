import { useState } from "react"
import { useSignup } from "../../hooks/useSignup"
import { useNavigate } from "react-router-dom"
import BroswerCard from "../../components/common/BrowserCard"
import Title from "../../components/common/Title"
import Button from "../../components/common/Button"
import "./index.css"

const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, error, isLoading } = useSignup()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username, email, password)
        if (error === null) navigate("/")
    }

    const renderSignupForm = () => {
        return (
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="signup-input"
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="signup-input"
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="signup-input"
                    />
                    <Button isLoading={isLoading} text="Sign up" />
                    {error && <div>{error}</div>}
                </form>
            </div>
        )
    }

    return (
        <>
            <Title text="Register" />
            <BroswerCard children={renderSignupForm()} />
        </>
    )
}

export default Signup
