import tmdbConfig from "./tmdb.config.js"

const tmdbEndpoints = {
    mediaList: ({ mediaType, mediaCategory, page }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaCategory}`, page
    ),
    mediaDetail: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}`
    ),
    mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(
        `genre/${ mediaType }/list`
    ),
    mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/credits`
    ),
    mediaVideo: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/videos`
    ),
    mediaRecommand: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/images`
    ),
    mediaImages: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
        `${mediaType}/${mediaId}/recommendations`
    ),
    mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(
        `search/${mediaType}`, { query, page }
    ),
    personDetail: ({ personId }) => tmdbConfig.getUrl(
        `person/${personId}`
    ),
    personMedia: ({ personId }) => tmdbConfig.getUrl(
        `person/${personId}/combined_credits`
    ),
}

export default { tmdbEndpoints }