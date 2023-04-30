import { useAuthContext } from "../hooks/useAuthContext"
import SearchMedia from "../components/SearchMedia"

const Home = () => {
    const { user } = useAuthContext()

    return (
        <>
            <p>Welcome {user.username}</p>
        </>
    )
}

export default Home
