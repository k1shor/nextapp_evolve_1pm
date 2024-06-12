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


export const getAllUsers = () => {
    return fetch(`${API}/userlist`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const change_role = (id, role, token) => {
    return fetch(`${API}/changerole/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role })
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}