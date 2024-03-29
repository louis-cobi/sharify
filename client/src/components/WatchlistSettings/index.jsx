import EmojiPicker from "../common/EmojiPicker"
import SearchUser from "../SearchUser"
import "./index.css"
import Button from "../common/Button"

const WatchlistSettings = ({
    setEmoji,
    emoji,
    title,
    onChange,
    users,
    onAdd,
    onRemove,
    onClick,
    text}) => {
    return(
        <>
        <div className="watchlist-settings-container">
            <div className="watchlist-settings-header">
                <div className="watchlist-settings-header-infos">
                    <div className="watchlist-settings-header-details">
                        <EmojiPicker setEmoji={setEmoji} emoji={emoji}/>
                        <input
                            type="text"
                            id="text-input"
                            name="text-input"
                            placeholder="Title"
                            value={title}
                            onChange={onChange}
                            className="watchlist-settings-header-input"
                        ></input>
                    </div>
                </div>
            </div>
            <div className="watchlist-settings-body">
                <SearchUser
                    users={users}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
                <div className="watchlist-settings-body-button">
                    <Button text="Submit" onClick={onClick} />
                </div>
            </div>
        </div>
        </>
    )
}

export default WatchlistSettings