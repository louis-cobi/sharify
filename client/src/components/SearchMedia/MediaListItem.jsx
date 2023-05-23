import tmdbConfigs from "../../api/tmdb.config"
import Dropdown from "../common/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faEllipsisVertical,
    faPlus,
    faXmark,
} from "@fortawesome/free-solid-svg-icons"

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
            {media.poster_path && (
                <div
                    onClick={() => onNavigate(media.id)}
                    className="media-content"
                >
                    <img
                        //src={tmdbConfigs.backdropPath(media.backdrop_path)}
                        src={tmdbConfigs.backdropPath(media.poster_path)}
                        alt={media.title}
                        className="media-content-image"
                    />
                    <p className="media-content-title">
                        {media.title || media.name}
                    </p>
                    {watchlistId ? (
                        isAdded ? (
                            <button onClick={(e) => onRemove(e, media)} className="search-media-button-remove">
                                <FontAwesomeIcon icon={faPlus} size="2x" />
                            </button>
                        ) : (
                            <button onClick={(e) => onAdd(e, media)} className="search-media-button-add">
                                <FontAwesomeIcon icon={faXmark} size="2x" />
                            </button>
                        )
                    ) : (
                        <Dropdown
                            icon={
                                <FontAwesomeIcon
                                    icon={faEllipsisVertical}
                                    size="2x"
                                />
                            }
                            left={true}
                        >
                            <div onClick={() => onNavigate(media.id)}>
                                Consult{" "}
                            </div>
                        </Dropdown>
                    )}
                </div>
            )}
        </div>
    )
}

export default MediaListItem
