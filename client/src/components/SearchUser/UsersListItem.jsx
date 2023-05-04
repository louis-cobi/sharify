const UsersListItem = ({user, onClick, add}) => {
    return (
        <div>
            {user.image ? (
                <img
                    src={user.image}
                    alt={user.username}
                    style={{ width: "100px" }}
                />
            ) : (
                <div>
                    <img
                        src={`https://avatars.dicebear.com/api/initials/${user.username}.svg`}
                        alt={user.username}
                    />
                </div>
            )}
            <p>{user.username}</p>
            <button onClick={(e) => onClick(e, user)}>{add ? "add" : "remove"}</button>
        </div>
    )
}

export default UsersListItem
