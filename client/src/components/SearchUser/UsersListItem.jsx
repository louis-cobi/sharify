import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"

const UsersListItem = ({ user, onClick, add }) => {
    return (
        <div className="user-info-container">
            {user.image ? (
                <img
                    src={user.image}
                    alt={user.username}
                    className="user-info-image"
                />
            ) : (
                <img
                    src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
                    alt={user.username}
                    className="user-info-image"
                />
            )}
            <p className="user-info-userName">{user.username}</p>
            {add ? (
                <button
                    onClick={(e) => onClick(e, user)}
                    className="user-info-button-add"
                >
                    <FontAwesomeIcon icon={faPlus} size="2x" />
                </button>
            ) : (
                <button
                    onClick={(e) => onClick(e, user)}
                    className="user-info-button-remove"
                >
                    <FontAwesomeIcon icon={faXmark} size="2x" />
                </button>
            )}
        </div>
    )
}

export default UsersListItem
