import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import watchlistApi from "../../api/modules/watchlist.api"
import UserWatchlistItem from "./UserWatchlistItem"

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
                console.log(err)
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
            console.log(err)
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
    return (
        <div>
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
