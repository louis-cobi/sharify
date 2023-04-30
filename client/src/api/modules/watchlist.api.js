import privateClient from "../client/private.client"

const watchlistEndpoints = {
    create: "watchlist/create",
    get: (userId) => `watchlist/get/${userId}`,
    getInfo: (userId) => `user/info/${userId}`,
    passwordUpdate: "user/update-password",
}

const watchlistApi = {
    create: async (title, emoji, users) => {
        try {
            const response = await privateClient.post(watchlistEndpoints.create, {
                title,
                emoji,
                users
            })

            return { response }
        } catch (err) {
            return { err }
        }
    },
    get: async (userId) => {
        try {
            const response = await privateClient.get(watchlistEndpoints.get(userId))

            return { response }
        } catch (err) {
            return { err }
        }
    },
    getInfo: async (userId) => {
        try {
            const response = await privateClient.get(
                watchlistEndpoints.getInfo(userId)
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
