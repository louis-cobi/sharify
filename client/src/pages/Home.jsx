import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import UserWatchlists from "../components/UserWatchlists"

const Home = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleCLick = () => {
        navigate("/createWatchlist")
    }

    return (
        <>
            <p>Welcome {user.username}</p>
            <UserWatchlists />
            <button onClick={() => handleCLick()}>add watchlist</button>
        </>
    )
}

export default Home
