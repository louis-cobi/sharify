import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import mediaApi from "../../api/modules/media.api"
import tmdbConfigs from "../../api/tmdb.config"
import SwiperCast from "./SwiperCast"
import SwiperVideo from "./SwiperVideo"
import "./index.css"
import MediaPlatform from "./MediaPlatform"
import { toast } from "react-toastify"
import Button from "../common/Button"
import Dropdown from "../common/Dropdown"
import watchlistApi from "../../api/modules/watchlist.api"

const DetailMedia = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [media, setMedia] = useState()
    const [watchlists, setWatchlists] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const { mediaType, mediaId, watchlistId } = useParams()
    useEffect(() => {
        const detailMedia = async () => {
            const { response, err } = await mediaApi.getDetail(
                mediaType,
                mediaId
            )
            if (response) {
                setMedia(response)
            }
            if (err) {
                toast.error(err.message)
            }
        }
        detailMedia()
        if (!watchlistId) {
            const fetchWatchlists = async () => {
                const { response, err } = await watchlistApi.getAll(user._id)
                if (response) {
                    const filtered = response.filter(
                        (watchlist) =>
                            !watchlist.medias.some(
                                (media) => media.mediaId === parseInt(mediaId)
                            )
                    )
                    setWatchlists(filtered)
                }
                if (err) {
                    toast.error(err.message)
                }
            }
            fetchWatchlists()
        }
        if (watchlistId) {
            const fetchWatchlist = async () => {
                const { response, err } = await watchlistApi.get(watchlistId)
                if (response) {
                    const isAdded = response.medias.some(
                        (media) => media.mediaId === parseInt(mediaId)
                    )
                    setIsAdd(isAdded)
                }
                if (err) {
                    toast.error(err.message)
                }
            }
            fetchWatchlist()
        }
    }, [mediaType, mediaId, watchlistId, user._id, isAdd])

    const handleAddWatchlists = async (watchlist) => {
        const poster_path = media.poster_path
        const backdrop_path = media.backdrop_path
        const mediaId = media.id
        const type = mediaType
        const title = media.title || media.name
        const { response: addMediaResponse, err: addMediaError } =
            await watchlistApi.addMedia(watchlist._id, {
                mediaId,
                title,
                type,
                poster_path,
                backdrop_path,
            })
        if (addMediaResponse) {
            toast.success(`successfully add to ${addMediaResponse.title}`)
            const {
                response: fetchWatchlistsResponse,
                err: fetchWatchlistsError,
            } = await watchlistApi.getAll(user._id)
            if (fetchWatchlistsResponse) {
                const filtered = fetchWatchlistsResponse.filter(
                    (watchlist) =>
                        !watchlist.medias.some(
                            (media) => media.mediaId === parseInt(mediaId)
                        )
                )
                setWatchlists(filtered)
            }
            if (fetchWatchlistsError) {
                toast.error(fetchWatchlistsError.message)
            }
        }
        if (addMediaError) {
            toast.error(addMediaError.message)
        }
    }

    const handleAdd = async () => {
        const poster_path = media.poster_path
        const backdrop_path = media.backdrop_path
        const mediaId = media.id
        const type = mediaType
        const title = media.title || media.name
        const { response, err } = await watchlistApi.addMedia(watchlistId, {
            mediaId,
            title,
            type,
            poster_path,
            backdrop_path,
        })
        if (response) {
            toast.success(`successfully add to ${response.title}`)
            setIsAdd(true)
        }
        if (err) {
            toast.error(err.message)
        }
    }

    const handleRemove = async () => {
        const poster_path = media.poster_path
        const backdrop_path = media.backdrop_path
        const mediaId = media.id
        const type = mediaType
        const title = media.title || media.name
        const { response, err } = await watchlistApi.removeMedia(watchlistId, {
            mediaId,
            title,
            type,
            poster_path,
            backdrop_path,
        })
        if (response) {
            toast.success(`successfully remove from ${response.title}`)
            setIsAdd(false)
        }
        if (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="media__wrapper">
            {media && (
                <>
                    <img
                        src={tmdbConfigs.posterPath(media.poster_path)}
                        alt={media.title}
                        className="media__image"
                    />
                    <h1 className="media__title">
                        {media.title || media.name}
                    </h1>
                    <div className="media__types">
                        <div className="media__types__title">Genres :</div>{" "}
                        <div className="media__types__items">
                            {media.genres.map((genre, i) => (
                                <p key={i} className="media__types__item">
                                    {genre.name}
                                </p>
                            ))}
                        </div>
                    </div>
                    <div className="media__btn">
                        {watchlistId ? (
                            isAdd ? (
                                <Button
                                    text="Remove"
                                    className="media__btn"
                                    onClick={handleRemove}
                                />
                            ) : (
                                <Button
                                    text="Add"
                                    className="media__btn"
                                    onClick={handleAdd}
                                />
                            )
                        ) : (
                            <Dropdown
                                className="media__btn"
                                center={true}
                                icon={
                                    <Button text="Add" className="media__btn" />
                                }
                            >
                                {watchlists &&
                                    watchlists.map((watchlist, i) => (
                                        <div
                                            key={i++}
                                            className="dropdown-watchlist-item"
                                            onClick={() =>
                                                handleAddWatchlists(watchlist)
                                            }
                                        >
                                            <div className="user-watchlist-emoji">
                                                <em-emoji
                                                    shortcodes={watchlist.emoji}
                                                    size="1em"
                                                ></em-emoji>
                                            </div>
                                            {watchlist.title}
                                        </div>
                                    ))}
                            </Dropdown>
                        )}
                    </div>
                    <div className="media__overview">
                        <div className="media__overview__title">Synopsys :</div>
                        <p className="media__overview__description">
                            {media.overview}
                        </p>
                    </div>
                    <div>
                        <MediaPlatform
                            platforms={media.providers.results}
                            title={media.title || media.name}
                        />
                    </div>
                    <div>
                        <SwiperVideo children={media.videos.results} />
                    </div>
                    <div>
                        <SwiperCast children={media.credits.cast} />
                    </div>
                </>
            )}
        </div>
    )
}

export default DetailMedia
