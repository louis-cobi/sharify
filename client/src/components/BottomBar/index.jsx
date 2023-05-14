import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faMagnifyingGlass,
    faBars,
    faUser,
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import "./index.css"

const BottomBar = () => {
    const navigate = useNavigate()

    const handleNavigateSearch = (e) => {
        e.preventDefault()
        navigate("/search")
    }

    const handleNavigateHome = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const handleNavigateProfile = (e) => {
        e.preventDefault()
        navigate("/profil")
    }

    return (
        <div className="bottom-bar">
            <div className="bottom-bar-container">
                <div
                    className="bottom-bar-item"
                    onClick={(e) => handleNavigateSearch(e)}
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                </div>
                <div
                    className="bottom-bar-item bottom-bar-item-center"
                    onClick={(e) => handleNavigateHome(e)}
                >
                    <FontAwesomeIcon icon={faBars} size="2x" />
                </div>
                <div
                    className="bottom-bar-item"
                    onClick={(e) => handleNavigateProfile(e)}
                >
                    <FontAwesomeIcon icon={faUser} size="2x" />
                </div>
            </div>
        </div>
    )
}

export default BottomBar
