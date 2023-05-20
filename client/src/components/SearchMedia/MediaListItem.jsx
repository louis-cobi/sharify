import tmdbConfigs from "../../api/tmdb.config"
import Dropdown from "../common/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

const MediaListItem = ({
    media,
    onNavigate,
    onRemove,
    onAdd,
    isAdded,
    watchlistId,
}) => {
    return (
        <div className="media-container">
            {media.backdrop_path && (
                <div onClick={() => onNavigate(media.id)} className="media-content">
                    <img
                        src={tmdbConfigs.backdropPath(media.backdrop_path)}
                        alt={media.title}
                        style={{ width: "100px" }}
                        className="media-content-image"
                    />
                    <p className="media-content-title">{media.title || media.name}</p>
                    <Dropdown
                        icon={<FontAwesomeIcon icon={faEllipsisVertical} size="2x"/>}
                        left={true}
                    >
                        {watchlistId &&
                        (isAdded ? (
                            <button onClick={(e) => onRemove(e, media)}>
                                remove
                            </button>
                        ) : (
                            <button onClick={(e) => onAdd(e, media)}>
                                add
                            </button>
                        ))}
                    </Dropdown>
                </div>
            )}
        </div>
    )
}

export default MediaListItem
