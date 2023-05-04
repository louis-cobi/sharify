
import tmdbConfigs from "../../api/tmdb.config"

const WatchlistItem = ({media, onNavigate}) => {
    return (
        <div onClick={(e) => onNavigate(e, media)} key={media.mediaId}>
            <img
                alt={media.title}
                src={tmdbConfigs.backdropPath(media.backdrop_path)}
                style={{ width: "200px" }}
            />
            {media.title}
        </div>
    )
}

export default WatchlistItem
