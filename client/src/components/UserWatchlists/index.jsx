import { useEffect, useState } from "react"
import watchlistApi from "../../api/modules/watchlist.api"

const UserWatchlists = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [watchlists, setWatchlists] = useState([])

    useEffect(() => {
        const fetchWatchlists = async () => {
            const { response, err } = await watchlistApi.get(user._id)
            if (response) {
                setWatchlists(response)
            }
            if (err) {
                console.log(err)
            }
        }
        fetchWatchlists()
    }, [])
    return (
        <div>
            {watchlists &&
                watchlists.map((watchlist) => {
                    return (
                        <div key={watchlist.title}>
                            <em-emoji
                                shortcodes={watchlist.emoji}
                                size="2em"
                            ></em-emoji>
                            {watchlist.title}
                        </div>
                    )
                })}
        </div>
    )
}

export default UserWatchlists
