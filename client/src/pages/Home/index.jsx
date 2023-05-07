import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import UserWatchlists from "../../components/UserWatchlists"
import FloattingButton from "../../components/common/FloattingButton"
import "./index.css"

const Home = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleCLick = () => {
        navigate("/createWatchlist")
    }

    return (
        <>
            <h1 className="welcome">Welcome</h1>
            <UserWatchlists />
            <FloattingButton onClick={() => handleCLick()} />
        </>
    )
}

export default Home
