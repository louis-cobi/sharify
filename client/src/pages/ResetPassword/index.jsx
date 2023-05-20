import { useState } from "react"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import userApi from "../../api/modules/user.api"
import BroswerCard from "../../components/common/BrowserCard"
import Title from "../../components/common/Title"
import Button from "../../components/common/Button"
import "./index.css"

const ResetPassword = () => {
    const { id, token } = useParams()
    const navigate = useNavigate()
    const [newPassword, setNewPassword] = useState("")
    const [passwordComfirm, setPasswordConfirm] = useState("")

    const handleSubmit = async () => {
        const { response, err } = await userApi.passwordReset(
            id,
            token,
            newPassword,
            passwordComfirm
        )
        if (response) {
            localStorage.setItem("user", JSON.stringify(response))
            toast.success("Password upadted")
            navigate("/")
        }
        if (err) {
            toast.error(err.message)
        }
    }

    const handleRender = () => {
        return (
            <form onSubmit={handleSubmit} className="reset-password-container">
                <label className="reset-password-label">Password</label>
                <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="reset-password-input"
                />
                <label className="reset-password-label">Confirm password</label>
                <input
                    value={passwordComfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    className="reset-password-input"
                />
                <Button text="Submit" />
            </form>
        )
    }

    return (
        <>
            <Title text="Reset Password" />
            <BroswerCard children={handleRender()} />
        </>
    )
}

export default ResetPassword
