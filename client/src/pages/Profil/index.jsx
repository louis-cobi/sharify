import Button from "../../components/common/Button"
import BrowserCard from "../../components/common/BrowserCard"
import { useState } from "react"
import Title from "../../components/common/Title"
import { useLogout } from "../../hooks/useLogout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import userApi from "../../api/modules/user.api"
import "./index.css"
import { toast } from "react-toastify"

const Profil = ({onUserUpdate}) => {
    const { logout } = useLogout()
    const user = JSON.parse(localStorage.getItem("user"))

    const [editingUsername, setEditingUsername] = useState(false)
    const [editingEmail, setEditingEmail] = useState(false)
    const [editingPassword, setEditingPassword] = useState(false)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState("")

        
    

    const handleUsernameBlur = async () => {
        setEditingUsername(false)
        const { response, err } = await userApi.usernameUpdate(
            user._id,
            username
        )
        if (response) {
            setUsername(response.username)
            const updatedUser = { ...user, username: response.username }
            localStorage.setItem("user", JSON.stringify(updatedUser))
            toast.success("username succesfully changed")
            onUserUpdate()
        }
        if (err) {
            toast.error(err.message)
        }
    }

    const handleEmailBlur = async () => {
        setEditingEmail(false)
        const { response, err } = await userApi.emailUpdate(user._id, email)
        if (response) {
            setEmail(response.email)
            const updatedUser = { ...user, email: response.email }
            localStorage.setItem("user", JSON.stringify(updatedUser))
            toast.success("email succesfully changed")
        }
        if (err) {
            toast.error(err.message)
        }
    }

    const handlePasswordBlur = async () => {
        setEditingPassword(false)
        const { response, err } = await userApi.passwordUpdate(
            user._id,
            password
        )
        if (response) {
            toast.success("email succesfully changed")
        }
        if (err) {
            toast.error(err.message)
        }
    }

    const handleLogout = () => {
        logout()
        onUserUpdate()
    }

    const renderProfil = () => {
        return (
            <div className="profil-container">
                {user && (
                    <div className="profil-info">
                        {user.image ? (
                            <div
                                className="profil-img"
                                style={{
                                    backgroundImage: `url(${user.image})`,
                                }}
                            ></div>
                        ) : (
                            <div
                                className="profil-img"
                                style={{
                                    backgroundImage: `url(https://avatars.dicebear.com/api/initials/${user.username}.svg)`,
                                }}
                            ></div>
                        )}
                        <div className="profil-username">
                            {editingUsername ? (
                                <>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        onBlur={handleUsernameBlur}
                                    />
                                    <FontAwesomeIcon icon={faPenToSquare} className="profil-edit-icon"/>
                                </>
                            ) : (
                                <>
                                    <span>{username}</span>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => setEditingUsername(true)}
                                        className="profil-edit-icon"
                                    />
                                </>
                            )}
                        </div>
                        <div className="profil-email">
                            {editingEmail ? (
                                <>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        onBlur={handleEmailBlur}
                                    />
                                    <FontAwesomeIcon icon={faPenToSquare} className="profil-edit-icon"/>
                                </>
                            ) : (
                                <>
                                    <span>{email}</span>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => setEditingEmail(true)}
                                        className="profil-edit-icon"
                                    />
                                </>
                            )}
                        </div>
                        <div className="profil-password">
                            {editingPassword ? (
                                <>
                                    <input
                                        type="text"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        onBlur={handlePasswordBlur}
                                    />
                                    <FontAwesomeIcon icon={faPenToSquare} className="profil-edit-icon"/>
                                </>
                            ) : (
                                <>
                                    <span>********</span>
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => setEditingPassword(true)}
                                        className="profil-edit-icon"
                                    />
                                </>
                            )}
                        </div>
                        <Button text="Logout" onClick={handleLogout} className="profil-edit-icon"/>
                    </div>
                )}
            </div>
        )
    }
    return (
        <>
            <Title text="Profil" />
            <BrowserCard children={renderProfil()} />
        </>
    )
}

export default Profil
