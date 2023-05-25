import { useState } from "react"
import { useNavigate } from "react-router-dom"
import watchlistApi from "../../api/modules/watchlist.api"
import { toast } from "react-toastify"
import WatchlistSettings from "../../components/WatchlistSettings"
import Title from "../../components/common/Title"

const CreateWatchlist = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))

    const [title, setTitle] = useState("")
    const [emoji, setEmoji] = useState("")
    const [users, setUsers] = useState([
        { _id: user._id, username: user.username, image: user.image },
    ])

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
        const filteredArray = users.filter((obj) => obj !== user)
        setUsers(filteredArray)
    }

    const handleSubmit = async () => {
        const emojiValue = emoji === "" ? ":clapper:" : emoji
        const { response, err } = await watchlistApi.create(title, emojiValue, users)
        if (response) {
            navigate(`/search/${response.id}`)
            toast.success(`${response.title} successfully created`)
        }
        if (err) {
            toast.error(err.message)
        }
    }

    return (
        <div>
            <Title text="New Watchlist" />
            <WatchlistSettings
                setEmoji={setEmoji}
                emoji={emoji}
                title={title}
                onChange={handleTextChange}
                users={users}
                onAdd={handleAddUser}
                onRemove={handleRemoveUser}
                onClick={() => handleSubmit()}
                text="Create"
            />
        </div>
    )
}

export default CreateWatchlist
