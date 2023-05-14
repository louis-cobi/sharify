import { useState } from "react"
import { toast } from "react-toastify"
import userApi from "../../api/modules/user.api"

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [passwordComfirm, setPasswordConfirm] = useState("")

    const handleClick = async (e) => {
        e.preventDefault()
        const { response, err } = await userApi.passwordReset(newPassword, passwordComfirm)
        if(response){
            toast.success("Password upadted")
        }
        if(err){
            toast.error(err.message)
        }
    }

    return (
        <div>
            <input value={newPassword} onChange={(e) => setNewPassword(e.value)} />
            <input value={passwordComfirm} onChange={(e) => setPasswordConfirm(e.value)} />
            <button onClick={(e) => handleClick(e)}>Submit</button>
        </div>
    )
}

export default ResetPassword
