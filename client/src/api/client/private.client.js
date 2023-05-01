import queryString from "query-string"

const baseURL = "http://localhost:5001/api/"

const user =  JSON.parse(localStorage.getItem("user"));

const privateClient = {
    get: async(endpoint, body, query) => {
        const url =  query ? `${baseURL}${endpoint}?${queryString.stringify(query)}` : `${baseURL}${endpoint}`
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            method: 'GET'
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("user")
        }
        if (response.ok) {
            return data
        } else {
            throw data
        }
    },
    post: async(endpoint, body, query) => {
        const url =  query ? `${baseURL}${endpoint}?${queryString.stringify(query)}` : `${baseURL}${endpoint}`
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            method: 'POST'
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("user")
        }
        if (response.ok) {
            return data
        } else {
            throw data
        }
    },
    async put(endpoint, body, query) {
        const url =  query ? `${baseURL}${endpoint}?${queryString.stringify(query)}` : `${baseURL}${endpoint}`
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            method: 'PUT'
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("user")
        }
        if (response.ok) {
            return data
        } else {
            throw data
        }
    },
    async patch(endpoint, body, query) {
        const url =  query ? `${baseURL}${endpoint}?${queryString.stringify(query)}` : `${baseURL}${endpoint}`
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            method: 'PATCH'
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("user")
        }
        if (response.ok) {
            return data
        } else {
            throw data
        }
    },
    async delete(endpoint, body, query) {
        const url =  query ? `${baseURL}${endpoint}?${queryString.stringify(query)}` : `${baseURL}${endpoint}`
        const options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
            method: 'DELETE'
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 401) {
            localStorage.removeItem("user")
        }
        if (response.ok) {
            return data
        } else {
            throw data
        }
    },
}

export default privateClient
