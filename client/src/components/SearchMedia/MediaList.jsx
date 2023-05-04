import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import watchlistApi from "../../api/modules/watchlist.api"
import MediaListItem from "./MediaListItem"

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
    }, [watchlistId])

    const navigate = useNavigate()

    const handleNavigate = (mediaId) => {
        navigate(`/detail/${mediaType}/${mediaId}`)
    }

    const handleAdd = async (e, media) => {
        e.stopPropagation()
        const backdrop_path = media.backdrop_path
        const mediaId = media.id
        const type = mediaType
        const title = media.title || media.name

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

    const handleRemove = async (e, media) => {
        e.stopPropagation()
        const backdrop_path = media.backdrop_path
        const mediaId = media.id
        const type = mediaType
        const title = media.title || media.name

        const { response, err } = await watchlistApi.removeMedia(watchlistId, {
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
                        <MediaListItem
                            key={i++}
                            media={media}
                            onNavigate={handleNavigate}
                            onRemove={handleRemove}
                            onAdd={handleAdd}
                            isAdded={isAdded}
                            watchlistId={watchlistId}
                        />
                    )
                })}
        </div>
    )
}

export default MediaList
