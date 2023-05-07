import Dropdown from "../common/Dropdown"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"

const UserWatchlistItem = ({ watchlist, onNavigate, onModify, onDelete }) => {
    return (
        <div
            key={watchlist._id}
            onClick={(e) => onNavigate(e, watchlist._id)}
            className="user-watchlist-item"
        >
            <div className="user-watchlist-emoji">
                <em-emoji shortcodes={watchlist.emoji} size="2em"></em-emoji>
            </div>

            <p className="user-watchlist-title">{watchlist.title}</p>
            <div className="user-watchlist-dropdown">
                <Dropdown
                    icon={
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            size="2x"
                        />
                    }
                    left={true}
                >
                    <div onClick={(e) => onNavigate(e, watchlist._id)}>
                        Consult{" "}
                    </div>
                    <div onClick={(e) => onModify(e, watchlist._id)}>
                        Modify{" "}
                    </div>
                    <div onClick={(e) => onDelete(e, watchlist._id)}>
                        Delete{" "}
                    </div>
                </Dropdown>
            </div>
        </div>
    )
}

export default UserWatchlistItem
