import React from "react"
import { useNavigate } from "react-router-dom"
import tmdbConfigs from "../../api/tmdb.config"

const SearchMediaList = ({ mediaList, mediaType }) => {
    const navigate = useNavigate()
    const handleNavigate = (mediaId) => {
        navigate(`/detail/${mediaType}/${mediaId}`)
    }
    return (
        <div>
            {mediaList &&
                mediaList.map((media, i) => {
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
                                </div>
                            )}
                        </div>
                    )
                })}
        </div>
    )
}

export default SearchMediaList
