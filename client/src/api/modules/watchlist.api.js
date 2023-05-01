import privateClient from "../client/private.client"

const watchlistEndpoints = {
    create: "watchlist/create",
    get: (watchlistId) => `watchlist/get/${watchlistId}`,
    getAll: (userId) => `watchlist/getAll/${userId}`,
    getInfo: (userId) => `user/info/${userId}`,
    addMedia: "watchlist/addMedia",
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
    passwordUpdate: async (password, newPassword, confirmNewPassword) => {
        try {
            const response = await privateClient.put(
                watchlistEndpoints.passwordUpdate,
                { password, newPassword, confirmNewPassword }
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
}

export default watchlistApi
