let API = "http://localhost:5000/api"

export const getAllProducts = () => {
    return fetch(`${API}/getallproducts`)
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const deleteProduct = (id, token) => {
    return fetch(`${API}/deleteproduct/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const addProduct = (product, token) => {
    return fetch(`${API}/addnewproduct`,{
        method: "POST",
        headers: {
            "Authorization":`Bearer ${token}`
        },
        body: product
    })
    .then(response => response.json())
    .catch(error => console.log(error))
}