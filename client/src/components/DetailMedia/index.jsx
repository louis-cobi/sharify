import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import mediaApi from "../../api/modules/media.api"
import tmdbConfigs from "../../api/tmdb.config"

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
                {media.videos.results && media.videos.results > 1 ? 
                    media.videos.results.splice(0, 10).map((video) => {
                        console.log(video)
                        return (
                            <iframe
                                key={video.key}
                                src={tmdbConfigs.youtubePath(video.key)}
                                width="100%"
                                title={video.name}
                                style={{ border: 0 }}
                            ></iframe>
                        )
                    }) :
                    media.videos.results.map((video) => {
                        console.log(video)
                        return (
                            <iframe
                                key={video.key}
                                src={tmdbConfigs.youtubePath(video.key)}
                                width="100%"
                                title={video.name}
                                style={{ border: 0 }}
                            ></iframe>
                        )
                    })
                }
            </div>
            <div>
                {media.credits.cast && 
                    media.credits.cast.splice(0, 10).map((cast, i) => {
                        return (
                            <div key={i}>
                                <img
                                    src={tmdbConfigs.posterPath(cast.profile_path)}
                                    alt={cast.name}
                                    style={{ width: "100px" }}
                                />
                                <p>{cast.name}</p>
                            </div>
                        )
                    })}
            </div>
            </>
            )}
        </div>
    )
}

export default DetailMedia
