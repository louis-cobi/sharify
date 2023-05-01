import React from "react"

const UsersList = ({ users, onAdd, onRemove, searchResult }) => {
    const userNotAdded = searchResult && searchResult.filter((userResult) =>
        users.every((user) => user._id !== userResult._id)
    )

    return (
        <div>
            <div>
                {users &&
                    users.map((user, i) => {
                        return (
                            <div key={i++}>
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.username}
                                        style={{ width: "100px" }}
                                    />
                                ) : (
                                    <div>futur image</div>
                                )}
                                <p>{user.username}</p>
                                <button onClick={(e) => onRemove(e, user)}>
                                    remove
                                </button>
                            </div>
                        )
                    })}
            </div>
            <div>
                {userNotAdded &&
                    userNotAdded.map((user, i) => {
                        return (
                            <div key={i++}>
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.username}
                                        style={{ width: "100px" }}
                                    />
                                ) : (
                                    <div>futur image</div>
                                )}
                                <p>{user.username}</p>
                                <button onClick={(e) => onAdd(e, user)}>
                                    add
                                </button>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default UsersList
