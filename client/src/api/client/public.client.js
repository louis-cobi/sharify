import queryString from "query-string"

const baseURL = "http://localhost:5001/api/"

const privateClient = {
    get: async(endpoint, body, query) => {
        const url =  query ? `${baseURL}${endpoint}?${queryString.stringify(query)}` : `${baseURL}${endpoint}`
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'GET'
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            if (data.status === 401) {
                localStorage.removeItem("user")
            }
            return data
        } else {
            throw data
        }
    },
    post : async(endpoint, body, query) => {
        const url =  query ? `${baseURL}${endpoint}?${queryString.stringify(query)}` : `${baseURL}${endpoint}`
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST'
        }
        if (body) {
            options.body = JSON.stringify(body);
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
            if (data.status === 401) {
                localStorage.removeItem("user")
            }
            return data
        } else {
            throw data
        }
    },
}

export default privateClient