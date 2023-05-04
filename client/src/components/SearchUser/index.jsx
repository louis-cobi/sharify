import { useEffect, useState } from "react"
import userApi from "../../api/modules/user.api"
import UsersList from "./UsersList"

const SearchUser = ({users , onAdd, onRemove}) => {
    const [searchtext, setSearchText] = useState("")
    const [result, setResult] = useState([])

    useEffect(() => {
        let timeoutId;

        const searchMedia = async () => {
            const { response, err } = await userApi.search(searchtext)
            if (response) {
                setResult(response)
            }
            if (err) {
                console.log(err.message)
            }
        }

        if (searchtext) {
            timeoutId = setTimeout(() => {
                searchMedia()
            }, 500)
        }

        return () => {
            clearTimeout(timeoutId)
        }
    }, [searchtext, setResult])

    const handleTextChange = async (event) => {
        setSearchText(event.target.value)
    }

    return (
        <div>
            <input type="search" onChange={handleTextChange} placeholder="search user"/>
            {result  && <UsersList searchResult={result} onAdd={onAdd} onRemove={onRemove} users={users}/>}
        </div>
    )
}

export default SearchUser
