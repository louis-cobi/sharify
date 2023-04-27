import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault()

        await login(username, password)
        navigate("/")
    }

    return(
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Login</h3>

            <label>Username:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}/>

            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>

            <button disabled={isLoading}>Login</button>

            <button onClick={() => navigate("/signup")}>register</button>
            
            {error && <div>{error}</div>}
        </form>
    )
}

export default Login