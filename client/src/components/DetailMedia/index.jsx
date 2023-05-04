import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import mediaApi from "../../api/modules/media.api"
import tmdbConfigs from "../../api/tmdb.config"
import SwiperCast from "./SwiperCast"
import SwiperVideo from "./SwiperVideo"

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
        <div>
            {media && (
                <>
                <img
                    src={tmdbConfigs.posterPath(media.poster_path)}
                    alt={media.title}
                    style={{ width: "100px" }}
                />
            <h1>{media.title || media.name}</h1>
            <div>
                {" "}
                {media.genres.map((genre, i) => (
                    <p key={i}>{genre.name}</p>
                ))}
            </div>
            <p>{media.overview}</p>
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
