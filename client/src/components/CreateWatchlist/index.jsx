import { useState } from "react"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import watchlistApi from "../../api/modules/watchlist.api"
import "./index.css"

const CreateWatchlist = () => {
    const [title, setTitle] = useState("")
    const [isPickerEmoji, setEmojiPicker] = useState(false)
    const [emoji, setEmoji] = useState("")

    const user =  JSON.parse(localStorage.getItem("user"));

    let users = [{ id: user._id}]

    const handleTextChange = (event) => {
        setTitle(event.target.value)
    }

    const handleSubmit = async() => {
        const {response, err} = await watchlistApi.create(title, emoji, users)
        if(response){
            console.log(response)
        }
        if(err){
            console.log(err)
        }
    }

    return (
        <div>
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
            <input
                type="text"
                id="text-input"
                name="text-input"
                value={title}
                onChange={handleTextChange}
            />
            <button onClick={() => handleSubmit()}>Create</button>
        </div>
    )
}

export default CreateWatchlist
