import { useEffect, useState } from "react"
import { useLogout } from "../../hooks/useLogout"
import ToggleTheme from "./ToggleTheme"
import "./index.css"

const Header = ({updateUser}) => {
    const { logout } = useLogout()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
    
    useEffect(() => {
        if (updateUser) {
            const updatedUser = JSON.parse(localStorage.getItem("user"));
            setUser(updatedUser);
          }
      }, [updateUser])

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="header">
                {user && (
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
                )}
                <div className="header-center"></div>
                <button onClick={handleClick}>log out</button>
                <div className="header-theme">
                    <ToggleTheme />
                </div>
            </div>
        </header>
    )
}

export default Header
