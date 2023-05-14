import privateClient from "../client/private.client"
import publicClient from "../client/public.client"

const userEndpoints = {
    signin: "user/signin",
    signup: "user/signup",
    getInfo: (userId) => `user/info/${userId}`,
    search: (searchText) => `user/search?searchText=${searchText}`,
    passwordUpdate: "user/update-password",
    sendReset: "user/send-rest",
    passwordReset: (id, token) => `/reset-password/${id}/${token}`
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
    passwordUpdate: async (password, newPassword, confirmNewPassword) => {
        try {
            const response = await privateClient.put(
                userEndpoints.passwordUpdate,
                { password, newPassword, confirmNewPassword }
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
            const response = await publicClient.put(
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
