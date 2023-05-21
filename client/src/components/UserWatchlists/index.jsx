import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import watchlistApi from "../../api/modules/watchlist.api"
import UserWatchlistItem from "./UserWatchlistItem"
import "./index.css"

const UserWatchlists = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()

    const [watchlists, setWatchlists] = useState([])

    useEffect(() => {
        const fetchWatchlists = async () => {
            const { response, err } = await watchlistApi.getAll(user._id)
            if (response) {
                setWatchlists(response)
            }
            if (err) {
                toast.error(err.message)
            }
        }
        fetchWatchlists()
    }, [user._id])

    const handleNavigate = (e, watchlistId) => {
        e.preventDefault()
        navigate(`/watchlist/${watchlistId}`)
    }

    const handleModify = (e, watchlistId) => {
        e.preventDefault()
        navigate(`/watchlist/update/${watchlistId}`)
    }

    const handleUpdate = async () => {
        const { response, err } = await watchlistApi.getAll(user._id)
        if (response) {
            setWatchlists(response)
        }
        if (err) {
            toast.error(err.message)
        }
    }

    const handleDelete = async (e, watchlistId) => {
        const { response, err } = await watchlistApi.delete(watchlistId)
        if (response) {
            toast.success(`${response.title} delete`)
            handleUpdate()
        }
        if (err) {
            toast.error(err.message)
        }
    }

    if (watchlists.length === 0) {
        return (
            <div className="user-watchlist-empty">
                <div>🤔</div>
                <p>
                    It seems that you don't have any watchlist yet. Click the +
                    button in below right corner to create one.
                </p>
            </div>
        )
    }

    return (
        <div className="user-watchlist-container">
            {watchlists &&
                watchlists.map((watchlist, i) => {
                    return (
                        <UserWatchlistItem
                            key={i++}
                            watchlist={watchlist}
                            onNavigate={handleNavigate}
                            onModify={handleModify}
                            onDelete={handleDelete}
                        />
                    )
                })}
        </div>
    )
}

export default UserWatchlists
