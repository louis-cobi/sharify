
import tmdbConfigs from "../../api/tmdb.config"
import Dropdown from "../common/Dropdown"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

const WatchlistItem = ({media, onNavigate, onRemove}) => {
    return (
        <div onClick={(e) => onNavigate(e, media)} key={media.mediaId}>
            <img
                alt={media.title}
                src={tmdbConfigs.backdropPath(media.backdrop_path)}
                style={{ width: "200px" }}
            />
            {media.title}
            <Dropdown icon={<FontAwesomeIcon icon={faEllipsisVertical} style={{color: "#000000",}} />}>
                <div onClick={(e) => onNavigate(e, media._id)} >Consult </div>
                <div onClick={(e) => onRemove(e, media)}>Remove </div>
            </Dropdown>
        </div>
    )
}

export default WatchlistItem
