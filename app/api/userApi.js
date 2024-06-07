// const API = process.env.backend_URL
const API = 'http://localhost:5000/api'

export const register = (user) => {
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const verify = (token) => {
    return fetch(`${API}/verifyemail/${token}`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const login = (user) => {
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const authenticate = (data) => {
    localStorage.setItem('jwt', JSON.stringify(data))
}

export const isAuthenticated = async () => {
    return localStorage.getItem('jwt') ? await JSON.parse(localStorage.getItem('jwt')) : false
}




