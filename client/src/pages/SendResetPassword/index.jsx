import { useState } from "react"
import BroswerCard from "../../components/common/BrowserCard"
import Button from "../../components/common/Button"
import Title from "../../components/common/Title"
import userApi from "../../api/modules/user.api"
import { toast } from "react-toastify"
import './index.css'

const SendResetPassword = () => {
    const [email, setEmail] = useState("")

    const handleSubmit = async() => {
        const { response, err } = await userApi.sendReset(email)
        if(response){
            toast.success(`Password reset send to ${email}`)
        }
        if(err){
            toast.error(err.message)
        }
    }

    const renderSendResetPassword = () => {
        return (
            <form onSubmit={handleSubmit} className="reset-password-container">
                <label className="reset-password-label">Enter your email to reset your password</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="reset-password-input"/>
                <Button text="Submit" />
            </form>
        )
    }

    return (
        <>
            <Title text="Forget Password" />
            <BroswerCard children={renderSendResetPassword()} />
        </>
    )
}

export default SendResetPassword
