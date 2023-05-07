import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import UserWatchlists from "../components/UserWatchlists"
import FloattingButton from "../components/common/FloattingButton"

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
            <FloattingButton onClick={() => handleCLick()} />
        </>
    )
}

export default Home
