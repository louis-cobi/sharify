
import tmdbConfigs from "../../api/tmdb.config"
import Dropdown from "../common/Dropdown"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import './index.css'

const WatchlistItem = ({media, onNavigate, onRemove}) => {
    return (
        <div onClick={(e) => onNavigate(e, media)} key={media.mediaId} className="watchlist-media-list-container">
            <img
                alt={media.title}
                src={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)}
                style={{ width: "200px" }}
                className="watchlist-media-list-image"
            />
            <p className="watchlist-media-list-title">{media.title}</p>
            <Dropdown icon={<FontAwesomeIcon icon={faEllipsisVertical} size="2x" />}>
                <div onClick={(e) => onNavigate(e, media._id)} >Consult </div>
                <div onClick={(e) => onRemove(e, media)}>Remove </div>
            </Dropdown>
        </div>
    )
}

export default WatchlistItem
