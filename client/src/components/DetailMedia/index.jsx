import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import mediaApi from "../../api/modules/media.api"
import tmdbConfigs from "../../api/tmdb.config"
import SwiperCast from "./SwiperCast"
import SwiperVideo from "./SwiperVideo"
import './index.css'
import MediaPlatform from "./MediaPlatform"

const DetailMedia = () => {
    const [media, setMedia] = useState()
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
                console.log(err.message)
            }
        }
        detailMedia()
    }, [mediaType, mediaId])

    return (
        <div className="media__wrapper">
            {media && (
                <>
                <img
                    src={tmdbConfigs.posterPath(media.poster_path)}
                    alt={media.title}
                    className="media__image"
                />
            <h1 className="media__title">{media.title || media.name}</h1>
            <div className="media__types">
                <div className="media__types__title">Genres :</div>
                {" "}
                <div className="media__types__items">
                    {media.genres.map((genre, i) => (
                        <p key={i} className="media__types__item">{genre.name}</p>
                    ))}
                </div>
            </div>
            <button className="media__btn">Add</button>
            <div className="media__overview">
                <div className="media__overview__title">Synopsys :</div>
                <p className="media__overview__description">{media.overview}</p>
            </div>
            <div>
                <MediaPlatform platforms={media.providers.results} title={media.title || media.name}/>
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
