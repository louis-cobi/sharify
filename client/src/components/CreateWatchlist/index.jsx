import { useState } from "react"
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import watchlistApi from "../../api/modules/watchlist.api"
import "./index.css"
import SearchUser from "../SearchUser"
import { useNavigate } from "react-router-dom"

const CreateWatchlist = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const [title, setTitle] = useState("")
    const [isPickerEmoji, setEmojiPicker] = useState(false)
    const [emoji, setEmoji] = useState("")
    const [users, setUsers] = useState([{ _id: user._id, username: user.username, image: user.image }])

    const handleTextChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAddUser = (e, user) => {
        e.preventDefault()
        const userList = [...users, user]
        setUsers(userList)
    }

    const handleRemoveUser = (e, user) => {
        e.preventDefault()
        const filteredArray = users.filter(obj => obj !== user)
        setUsers(filteredArray)
    }


    const handleSubmit = async () => {
        const { response, err } = await watchlistApi.create(title, emoji, users)
        if (response) {
            navigate(`/search/${response.id}`)
            console.log(response)
        }
        if (err) {
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
            <SearchUser users={users} onAdd={handleAddUser} onRemove={handleRemoveUser}/>
            <button onClick={() => handleSubmit()}>Create</button>
        </div>
    )
}

export default CreateWatchlist
