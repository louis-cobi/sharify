import React from "react"
import UsersListItem from "./UsersListItem"

const UsersList = ({ users, onAdd, onRemove, searchResult }) => {
    const userNotAdded =
        searchResult &&
        searchResult.filter((userResult) =>
            users.every((user) => user._id !== userResult._id)
        )

    return (
        <div>
            <div>
                {users &&
                    users.map((user, i) => {
                        return <UsersListItem key={i++} user={user} onClick={onRemove} add={false}/>
                    })}
            </div>
            <div>
                {userNotAdded &&
                    userNotAdded.map((user, i) => {
                        return <UsersListItem key={i++} user={user} onClick={onAdd} add={true}/>
                    })}
            </div>
        </div>
    )
}

export default UsersList
