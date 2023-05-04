import tmdbConfigs from "../../api/tmdb.config"

const MediaListItem = ({
    media,
    onNavigate,
    onRemove,
    onAdd,
    isAdded,
    watchlistId,
}) => {
    return (
        <div>
            {media.backdrop_path && (
                <div onClick={() => onNavigate(media.id)}>
                    <img
                        src={tmdbConfigs.backdropPath(media.backdrop_path)}
                        alt={media.title}
                        style={{ width: "100px" }}
                    />
                    <p>{media.title || media.name}</p>
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
                </div>
            )}
        </div>
    )
}

export default MediaListItem
