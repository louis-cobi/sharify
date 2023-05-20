import privateClient from "../client/private.client"
import publicClient from "../client/public.client"

const userEndpoints = {
    signin: "user/signin",
    signup: "user/signup",
    getInfo: (userId) => `user/info/${userId}`,
    search: (searchText) => `user/search?searchText=${searchText}`,
    passwordUpdate: "user/update-password",
    usernameUpdate: "user/update-username",
    emailUpdate: "user/update-email",
    sendReset: "user/send-reset",
    passwordReset: (id, token) => `user/reset-password/${id}/${token}`
}

const userApi = {
    signin: async (username, password) => {
        try {
            const response = await publicClient.post(userEndpoints.signin, {
                username,
                password,
            })

            return { response }
        } catch (err) {
            return { err }
        }
    },
    signup: async (username, email, password) => {
        try {
            const response = await publicClient.post(userEndpoints.signup, {
                username,
                email,
                password,
            })

            return { response }
        } catch (err) {
            return { err }
        }
    },
    getInfo: async (userId) => {
        try {
            const response = await privateClient.get(
                userEndpoints.getInfo(userId)
            )

            return { response }
        } catch (err) {
            return { err }
        }
    },
    search: async (searchText) => {
        try {
            const response = await privateClient.get(
                userEndpoints.search(searchText)
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    passwordUpdate: async (id, password) => {
        try {
            const response = await privateClient.patch(
                userEndpoints.passwordUpdate,
                { id, password }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    usernameUpdate: async (id, username) => {
        try {
            const response = await privateClient.patch(
                userEndpoints.usernameUpdate,
                { id, username }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    emailUpdate: async (id, email) => {
        try {
            const response = await privateClient.patch(
                userEndpoints.emailUpdate,
                { id, email }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
    sendReset: async (email) => {
        try {
            const response = await publicClient.post(userEndpoints.sendReset, {
                email,
            })
            return { response }
        } catch (err) {
            return { err }
        }
    },
    passwordReset: async (id, token, newPassword, confirmPassword) => {
        try {
            const response = await publicClient.patch(
                userEndpoints.passwordReset(id, token),
                { newPassword, confirmPassword }
            )
            return { response }
        } catch (err) {
            return { err }
        }
    },
}

export default userApi
