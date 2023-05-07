import Dropdown from "../common/Dropdown"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'


const UserWatchlistItem = ({watchlist, onNavigate, onModify, onDelete}) => {
    return (
        <div key={watchlist._id} onClick={(e) => onNavigate(e, watchlist._id)}>
            <em-emoji
                shortcodes={watchlist.emoji}
                size="2em"
            ></em-emoji>
            {watchlist.title}
            <Dropdown icon={<FontAwesomeIcon icon={faEllipsisVertical} style={{color: "#000000",}} />}>
                <div onClick={(e) => onNavigate(e, watchlist._id)} >Consult </div>
                <div onClick={(e) => onModify(e, watchlist._id)}>Modify </div>
                <div onClick={(e) => onDelete(e, watchlist._id)}>Delete </div>
            </Dropdown>
        </div>
    )
}

export default UserWatchlistItem