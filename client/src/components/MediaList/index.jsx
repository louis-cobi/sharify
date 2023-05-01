import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import tmdbConfigs from "../../api/tmdb.config"
import watchlistApi from "../../api/modules/watchlist.api"

const MediaList = ({ mediaList, mediaType }) => {
    const { watchlistId } = useParams()
    const [watchlistMedia, setWatchlistMedia] = useState([])

    useEffect(() => {
        if (watchlistId) {
            const fetchWatchlist = async () => {
                const { response, err } = await watchlistApi.get(watchlistId)
                if (response) {
                    console.log(response)
                    setWatchlistMedia(response.medias)
                }
                if (err) {
                    console.log(err)
                }
            }
            fetchWatchlist()
        }
    }, [])

    const navigate = useNavigate()

    const handleNavigate = (mediaId) => {
        navigate(`/detail/${mediaType}/${mediaId}`)
    }

    const handleAdd = async (e, media) => {
        e.stopPropagation()
        const backdrop_path = media.backdrop_path
        const mediaId = media.id
        const type = mediaType
        const title = media.title

        const { response, err } = await watchlistApi.addMedia(watchlistId, {
            mediaId,
            title,
            type,
            backdrop_path,
        })
        if (response) {
            console.log(response)
            setWatchlistMedia(response.medias)
        }
        if (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {mediaList &&
                mediaList.map((media, i) => {
                    const isAdded = watchlistMedia.some(
                        (watchlistItem) => watchlistItem.mediaId === media.id
                    )
                    return (
                        <div key={i++}>
                            {media.backdrop_path && (
                                <div onClick={() => handleNavigate(media.id)}>
                                    <img
                                        src={tmdbConfigs.backdropPath(
                                            media.backdrop_path
                                        )}
                                        alt={media.title}
                                        style={{ width: "100px" }}
                                    />
                                    <p>{media.title}</p>
                                    {watchlistId &&
                                        (isAdded ? (
                                            <button
                                                onClick={(e) =>
                                                    handleAdd(e, media)
                                                }
                                            >
                                                remove
                                            </button>
                                        ) : (
                                            <button
                                                onClick={(e) =>
                                                    handleAdd(e, media)
                                                }
                                            >
                                                add
                                            </button>
                                        ))}
                                </div>
                            )}
                        </div>
                    )
                })}
        </div>
    )
}

export default MediaList
