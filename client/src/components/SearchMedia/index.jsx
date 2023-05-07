import { useEffect, useState } from "react"
import mediaApi from "../../api/modules/media.api"
import tmdbConfigs from "../../api/tmdb.config"
import Dropdown from "../common/Dropdown"
import MediaList from "./MediaList"

const SearchMedia = () => {
    const [search, setSearch] = useState("")
    const [mediaType, setMediaType] = useState(tmdbConfigs.mediaType.movie)
    const [result, setResult] = useState([])

    useEffect(() => {
        let timeoutId

        const searchMedia = async () => {
            const { response, err } = await mediaApi.search(mediaType, search)
            if (response) {
                setResult(response.results)
            }
            if (err) {
                console.log(err.message)
            }
        }

        if (search) {
            timeoutId = setTimeout(() => {
                searchMedia()
            }, 500)
        }

        return () => {
            clearTimeout(timeoutId)
        }
    }, [search, mediaType, setResult])

    const handleTextChange = async (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            <label htmlFor="text-input">Enter Text:</label>
            <Dropdown icon={mediaType}>
                <div
                    onClick={() => {
                        setMediaType(tmdbConfigs.mediaType.movie)
                    }}
                >
                    {tmdbConfigs.mediaType.movie}
                </div>
                <div
                    onClick={() => {
                        setMediaType(tmdbConfigs.mediaType.tv)
                    }}
                >
                    {tmdbConfigs.mediaType.tv}
                </div>
            </Dropdown>
            <input type="search" onChange={handleTextChange} />
            {result && <MediaList mediaList={result} mediaType={mediaType} />}
        </div>
    )
}

export default SearchMedia
