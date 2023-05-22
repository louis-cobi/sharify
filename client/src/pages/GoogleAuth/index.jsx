import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import userApi from "../../api/modules/user.api"
import { toast } from "react-toastify"

const GoogleAuth = () => {

    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchSession = async () => {
            const { response, err } = await userApi.getSession(userId)
            if (response) {
                localStorage.setItem("user", JSON.stringify(response))
                navigate("/")
                toast.success(`Welcome ${response.username}`)
            }
            if (err){
                toast.error(err.message)
            }
        }
        fetchSession()
    }, [])

    return <div>Loading ...</div>
}

export default GoogleAuth