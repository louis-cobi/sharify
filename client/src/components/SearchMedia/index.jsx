import { useEffect, useState } from "react"
import mediaApi from "../../api/modules/media.api"
import tmdbConfigs from "../../api/tmdb.config"
import Dropdown from "../common/Dropdown"
import Title from "../common/TItle"
import MediaList from "./MediaList"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import './index.css'

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
            <Title text="Film" />
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
            <div className="search-media-bar">
                <input type="search" onChange={handleTextChange} className="search-media-bar-input"/>
                <div className="search-media-bar-icon">
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </div>
            </div>
            {result && <MediaList mediaList={result} mediaType={mediaType} />}
        </div>
    )
}

export default SearchMedia
