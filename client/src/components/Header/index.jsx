import { useEffect, useState } from "react"
import ToggleTheme from "./ToggleTheme"
import { useThemeContext } from "../../hooks/useThemeContext"
import "./index.css"

const Header = ({ updateUser }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    const { darkMode } = useThemeContext()

    useEffect(() => {
        if (updateUser) {
            const updatedUser = JSON.parse(localStorage.getItem("user"))
            setUser(updatedUser)
        }
    }, [updateUser])

    return (
        <header>
            <div className="header">
                {user ? (
                    <div className="header-info">
                        {user.image ? (
                            <div
                                className="header-img"
                                style={{
                                    backgroundImage: `url(${user.image})`,
                                }}
                            ></div>
                        ) : (
                            <div
                                className="header-img"
                                style={{
                                    backgroundImage: `url(https://avatars.dicebear.com/api/initials/${user.username}.svg)`,
                                }}
                            ></div>
                        )}
                        <span className="header-name">{user.username}</span>
                    </div>
                ) : (
                    <div className="header-info">
                        {darkMode ? (
                            <img
                                className="logo-img"
                                src={
                                    process.env.PUBLIC_URL +
                                    "sharify-logo-dark.png"
                                }
                                alt="sharify logo"
                            />
                        ) : (
                            <img
                                className="logo-img"
                                src={
                                    process.env.PUBLIC_URL +
                                    "sharify-logo-light.png"
                                }
                                alt="sharify logo"
                            />
                        )}
                        <span className="header-name">Sharify</span>
                    </div>
                )}
                <div className="header-center"></div>
                <div className="header-theme">
                    <ToggleTheme />
                </div>
            </div>
        </header>
    )
}

export default Header
