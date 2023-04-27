import { useAuthContext } from "../hooks/useAuthContext"

const Home = () => {
    const { user } = useAuthContext()

    // const user = JSON.parse(localStorage.getItem("user"))
    return <p>Welcome {user.username}</p>
}

export default Home
