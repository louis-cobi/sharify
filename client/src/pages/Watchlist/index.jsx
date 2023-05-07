import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import watchlistApi from "../../api/modules/watchlist.api"
import WatchlistItem from "../../components/WatchlistItem"

const Watchlist = () => {
    const navigate = useNavigate()
    const { watchlistId } = useParams()
    const [watchlist, setWatchlist] = useState([])
    useEffect(() => {
        const fetchWatchlist = async () => {
            const { response, err } = await watchlistApi.get(watchlistId)
            if (response) {
                console.log(response)
                setWatchlist(response)
            }
            if (err) {
                console.log(err)
            }
        }
        fetchWatchlist()
    }, [watchlistId])

    const handleNavigate = (e, media) => {
        e.preventDefault()
        navigate(`/detail/${media.type}/${media.mediaId}`)
    }

    const handleNavigateModify = (e) => {
        e.preventDefault()
        navigate(`/watchlist/update/${watchlistId}`)
    }

    const handleUpadte = async() => {
        const {response, err} = await watchlistApi.get(watchlistId)
        if(response){
            setWatchlist(response)
        }
        if(err){
            toast.error(err.message)
        }
    }

    const handleRemove = async(e, media) => {
        const {response, err} = await watchlistApi.removeMedia(watchlistId, media)
        if (response){
            handleUpadte()
        }
        if(err){
            toast.error(err.message)
        }
    }

    return (
        <div>
            {watchlist.title && watchlist.emoji && (
                <div>
                    <em-emoji
                        shortcodes={watchlist.emoji}
                        size="2em"
                    ></em-emoji>
                    {watchlist.title}
                    <button onClick={(e) => handleNavigateModify(e)}>modify</button>
                </div>

            )}
            {watchlist.medias &&
                watchlist.medias.map((media, i) => {
                    return <WatchlistItem  key={i++} media={media} onNavigate={handleNavigate} onRemove={handleRemove}/>
                })}
        </div>
    )
}

export default Watchlist
