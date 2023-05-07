import "./index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"

const FloattingButton = ({ onClick }) => {
    const handleClick = () => {
        onClick()
    }

    return (
        <button className="floatting-button" onClick={() => handleClick()}>
            <FontAwesomeIcon icon={faPlus} size="3x" />
        </button>
    )
}

export default FloattingButton
