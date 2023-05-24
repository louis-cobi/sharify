import { lazy, Suspense } from "react"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import UserWatchlistSkeleton from "../../components/UserWatchlistSkeleton"
// import UserWatchlists from "../../components/UserWatchlists"
import FloattingButton from "../../components/common/FloatingButton"
import "./index.css"
import Title from "../../components/common/Title"

const UserWatchlists = lazy(() => import("../../components/UserWatchlists"))

const Home = () => {
    const { user } = useAuthContext()
    const navigate = useNavigate()

    const handleCLick = () => {
        navigate("/createWatchlist")
    }

    return (
        <>
            <Title text="Welcome" />
            <Suspense fallback={<UserWatchlistSkeleton/>}>
                <UserWatchlists />
            </Suspense>
            <FloattingButton onClick={() => handleCLick()} />
        </>
    )
}

export default Home
