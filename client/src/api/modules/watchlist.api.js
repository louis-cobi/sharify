import privateClient from "../client/private.client"

const watchlistEndpoints = {
    create: "watchlist/create",
    update: (watchlistId) => `watchlist/update/${watchlistId}`,
    get: (watchlistId) => `watchlist/get/${watchlistId}`,
    getAll: (userId) => `watchlist/getAll/${userId}`,
    addMedia: "watchlist/addMedia",
    removeMedia: "watchlist/removeMedia",
    delete: (watchlistId) => `watchlist/delete/${watchlistId}`
}

const watchlistApi = {
    create: async (title, emoji, users) => {
        try {
            const response = await privateClient.post(
                watchlistEndpoints.create,
                {
                    title,
                    emoji,
                    users,
                }
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
    update: async (watchlistId, body) => {
        try {
            const response = await privateClient.patch(
                watchlistEndpoints.update(watchlistId),
                body
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
    get: async (watchlistId) => {
        try {
            const response = await privateClient.get(
                watchlistEndpoints.get(watchlistId)
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
    getAll: async (userId) => {
        try {
            const response = await privateClient.get(
                watchlistEndpoints.getAll(userId)
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
    addMedia: async (watchlistId, media) => {
        try {
            const response = await privateClient.patch(
                watchlistEndpoints.addMedia,
                { watchlistId, media }
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
    removeMedia: async (watchlistId, media) => {
        try {
            const response = await privateClient.patch(
                watchlistEndpoints.removeMedia,
                { watchlistId, media }
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
    delete: async (watchlistId) => {
        try {
            const response = await privateClient.delete(
                watchlistEndpoints.delete(watchlistId)
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
}

export default watchlistApi
