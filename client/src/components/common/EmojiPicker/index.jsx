import { useState, useEffect, useRef } from "react"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
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
            >
                {emoji !== "" ? (
                    <em-emoji shortcodes={emoji} size="2em"></em-emoji>
                ) : (
                    "Pick emoji"
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
