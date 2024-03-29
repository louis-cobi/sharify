import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import watchlistApi from "../../api/modules/watchlist.api"
import WatchlistSettings from "../../components/WatchlistSettings"
import { toast } from "react-toastify"
import CardSkeleton from "../../components/common/CardSkeleton"
import Title from "../../components/common/Title"

const CreateWatchlist = () => {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user"))
    const { watchlistId } = useParams()

    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [emoji, setEmoji] = useState("")
    const [users, setUsers] = useState([
        { _id: user._id, username: user.username, image: user.image },
    ])

    useEffect(() => {
        const fetchWatchlist = async () => {
            const { response, err } = await watchlistApi.get(watchlistId)
            if (response) {
                setTitle(response.title)
                setEmoji(response.emoji)
                setUsers(response.users)
                setIsLoading(false)
            }
            if (err) {
                toast.error(err.message)
                setIsLoading(false)
            }
        }
        fetchWatchlist()
    }, [watchlistId])

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
        const { response, err } = await watchlistApi.update(watchlistId, {
            title,
            emoji,
            users,
        })
        if (response) {
            navigate(`/watchlist/${response.id}`)
            toast.success(` ${response.title} modified`)
        }
        if (err) {
            toast.error(err.message)
        }
    }

    return (
        <div>
            <Title text="Watchlist Settings" />
            {isLoading ? (
                <CardSkeleton />
            ) : (
                <WatchlistSettings
                    setEmoji={setEmoji}
                    emoji={emoji}
                    title={title}
                    onChange={handleTextChange}
                    users={users}
                    onAdd={handleAddUser}
                    onRemove={handleRemoveUser}
                    onClick={() => handleSubmit()}
                    text="Save"
                />
            )}
        </div>
    )
}

export default CreateWatchlist
