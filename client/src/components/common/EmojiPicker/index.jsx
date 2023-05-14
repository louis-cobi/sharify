import { useState, useEffect, useRef } from "react"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceSmile} from "@fortawesome/free-regular-svg-icons"
import "./index.css"

const EmojiPicker = ({ setEmoji, emoji }) => {
    const [isPickerEmoji, setEmojiPicker] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside, true)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true)
        }
    }, [])

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setEmojiPicker(false)
        }
    }

    return (
        <div ref={dropdownRef}>
            <button
                onClick={() => {
                    setEmojiPicker(!isPickerEmoji)
                }}
                className="emoji-picker-button"
            >
                {emoji !== "" ? (
                    <em-emoji shortcodes={emoji} size="1.5em"></em-emoji>
                ) : (
                    <FontAwesomeIcon icon={faFaceSmile} className="emoji-faFaceSmile" />
                    // <FontAwesomeIcon icon={faFaceSmile} style={{color: "#000000",}} />
                )}
            </button>
            <div className={isPickerEmoji ? "visible" : "none-visible"}>
                <Picker
                    data={data}
                    previewPosition="none"
                    onEmojiSelect={(e) => {
                        setEmoji(e.shortcodes)
                        setEmojiPicker(false)
                    }}
                />
            </div>
        </div>
    )
}

export default EmojiPicker
