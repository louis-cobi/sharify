import EmojiPicker from "../common/EmojiPicker"
import SearchUser from "../SearchUser"

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
        <div>
            <div>
                <EmojiPicker setEmoji={setEmoji} emoji={emoji} />
                <input
                    type="text"
                    id="text-input"
                    name="text-input"
                    placeholder="Title"
                    value={title}
                    onChange={onChange}
                />
            </div>
            <SearchUser
                users={users}
                onAdd={onAdd}
                onRemove={onRemove}
            />
            <button onClick={onClick}>{text}</button>
        </div>
    )
}

export default WatchlistSettings