import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import watchlistApi from "../../api/modules/watchlist.api"
import Title from "../../components/common/Title"
import WatchlistItem from "../../components/WatchlistItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSliders } from "@fortawesome/free-solid-svg-icons"
import FloattingButton from "../../components/common/FloatingButton"
import './index.css'

const Watchlist = () => {
    const navigate = useNavigate()
    const { watchlistId } = useParams()
    const [watchlist, setWatchlist] = useState([])
    useEffect(() => {
        const fetchWatchlist = async () => {
            const { response, err } = await watchlistApi.get(watchlistId)
            if (response) {
                setWatchlist(response)
            }
            if (err) {
                toast.error(err.message)
            }
        }
        fetchWatchlist()
    }, [watchlistId])

    const handleNavigate = (e, media) => {
        e.preventDefault()
        navigate(`/detail/${media.type}/${media.mediaId}/${watchlistId}`)
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

    const handleAdd = () => {
        navigate(`/search/${watchlistId}`)
    }

    return (
        <div>
            <Title text="My watch list"/>
            <div className="watch-list-container">
                <div className="watch-list-header">
                    {watchlist.title && watchlist.emoji && (
                        <div className="watch-list-header-info">
                            <em-emoji
                                shortcodes={watchlist.emoji}
                                size="2em"
                            ></em-emoji>
                            <div className="watch-list-header-title">{watchlist.title}</div>
                            <button onClick={(e) => handleNavigateModify(e)} className="watch-list-header-button">
                                <FontAwesomeIcon icon={faSliders} size="2x"/>
                            </button>
                        </div>
                    )}
                </div>
                <div className="watch-list-films">
                    {watchlist.medias &&
                        watchlist.medias.map((media, i) => {
                            return <WatchlistItem  key={i++} media={media} onNavigate={handleNavigate} onRemove={handleRemove}/>
                        })}
                </div>
            </div>
            <FloattingButton onClick={() => handleAdd()} />
        </div>
    )
}

export default Watchlist
