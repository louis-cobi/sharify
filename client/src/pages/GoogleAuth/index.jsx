import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuthContext } from "../../hooks/useAuthContext"
import userApi from "../../api/modules/user.api"
import { toast } from "react-toastify"

const GoogleAuth = ({onUserUpdate}) => {
    const { userId } = useParams()
    const navigate = useNavigate()
    const { dispatch } = useAuthContext()

    useEffect(() => {
        const fetchSession = async () => {
            const { response, err } = await userApi.getSession(userId)
            if (response) {
                localStorage.setItem("user", JSON.stringify(response))
                dispatch({ type: "LOGIN", payload: response })
                toast.success(`Welcome ${response.username}`)
                onUserUpdate()
                navigate("/")
            }
            if (err) {
                toast.error(err.message)
            }
        }
        fetchSession()
    }, [])

    return <div> "Loading..."</div>
}

export default GoogleAuth
