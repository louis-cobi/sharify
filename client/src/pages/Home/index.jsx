import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import UserWatchlists from "../../components/UserWatchlists"
import FloattingButton from "../../components/common/FloatingButton"
import "./index.css"
import Title from "../../components/common/Title"

const Home = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleCLick = () => {
        navigate("/createWatchlist")
    }

    return (
        <>
            <Title text="Welcome" />
            <UserWatchlists />
            <FloattingButton onClick={() => handleCLick()} />
        </>
    )
}

export default Home
