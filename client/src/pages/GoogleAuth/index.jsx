import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import userApi from "../../api/modules/user.api"
import { toast } from "react-toastify"

const GoogleAuth = () => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSession = async () => {
            const { response, err } = await userApi.getSession(userId)
            if (response) {
                localStorage.setItem("user", JSON.stringify(response))
                setIsLoading(false)
                toast.success(`Welcome ${response.username}`)
            }
            if (err) {
                toast.error(err.message)
            }
            if(!isLoading){
                navigate("/")
            }
        }
        fetchSession()
    }, [isLoading])

    return <div>{isLoading ? "Loading..." : "Redirecting..."}</div>
}

export default GoogleAuth
