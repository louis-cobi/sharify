import { useState, useEffect } from "react"
import tmdbConfigs from "../../api/tmdb.config"

const MediaPlatform = ({ platforms, title }) => {
    const [renderPlatform, setRenderPlatform] = useState([])

    useEffect(() => {
        if (platforms && platforms.hasOwnProperty("FR")) {
            const providers = platforms["FR"]

            // Vérifier si la valeur de rendu pour "AG3" est présente
            if (providers && providers.hasOwnProperty("flatrate")) {
                const flatrateData = providers["flatrate"]

                // Vérifier si la valeur de rendu est disponible dans le tableau flatrateData
                if (Array.isArray(flatrateData) && flatrateData.length > 0) {
                    const renderPlatform = flatrateData
                    setRenderPlatform(renderPlatform)
                }
            }
        }
    }, [])

    const handleCLick = (e, platform) => {
        e.preventDefault()
        if(platform.provider_name === "Netflix"){
            window.open(`https://www.netflix.com/search?q=${title}`)
        }
        if(platform.provider_name === "Amazon Prime Video"){
            window.open(`https://www.primevideo.com/search/ref=atv_nb_sug?ie=UTF8&phrase=${title}`)
        }
        if(platform.provider_name === "Disney Plus"){
            window.open(`https://www.disneyplus.com/fr-fr/search?q=${title}`)
        }
    }

    const filteredPlatforms = renderPlatform.filter(
        (platform) =>
          platform.provider_name === "Netflix" ||
          platform.provider_name === "Amazon Prime Video" ||
          platform.provider_name === "Disney Plus"
      );

    return (
        <div className="media_platform_container">
            {filteredPlatforms.map((platform) => (
                <div className="media_platform" onClick={(e) => handleCLick(e, platform)}>
                    <img className="media_platform_img" src={tmdbConfigs.posterPath(platform.logo_path)} />
                </div>
            ))}
        </div>
    )
}

export default MediaPlatform
