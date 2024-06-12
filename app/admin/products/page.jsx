"use client"
import { deleteProduct, getAllProducts } from "@/app/api/productApi"
// import { deleteCategory, getAllCategories } from "@/app/api/categoryApi"
import { isAuthenticated } from "@/app/api/userApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const page = () => {
    // let [categories, setCategories] = useState([])
    let [products, setProducts] = useState([])
    let [token, setToken] = useState('')
    let [success, setSuccess] = useState(false)

    useEffect(() => {
        getAllProducts()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setProducts(data)
                    setSuccess(false)
                }
            })
        isAuthenticated()
        .then(data=>{
            if(data.token){
                setToken(data.token)
            }
        })

    }, [success])

    const handleDelete = (id) => e => {
        e.preventDefault()
        Swal.fire({
            title: 'Warning',
            text: 'Are you sure you want to delete this product?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: "orange"
        })
            .then(result => {
                if (result.isConfirmed) {
                    deleteProduct(id, token)
                        .then(data => {
                            if (data.error) {
                                Swal.fire('Error', data.error, 'error')
                            }
                            else {
                                setSuccess(true)
                                Swal.fire('Success', "Product deleted successfully", 'success')
                            }
                        })
                }
            })
    }


    return (
        <>
            <h1 className="text-2xl underline font-bold">Products</h1>
            <Link href={'/admin/products/new'}>Add New Product </Link>

            <table>
                <thead>
                    <tr>
                        <td>S.No.</td>
                        <td>Product Image</td>
                        <td>Title</td>
                        <td>Unit Price</td>
                        <td>Count in Stock</td>
                        <td>Rating</td>
                        <td>Category</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 &&
                        products.map((product, i) => {
                            return <tr>
                                <td>{i + 1}</td>
                                <td>
                                  <img src={`http://localhost:5000/${product.product_image}`} alt={product.product_image} className="h-36"/>
                                </td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.count_in_stock}</td>
                                <td>{product.rating}</td>
                                <td>{product.category?.category_name}</td>
                                <td>
                                    <Link href={`/admin/products/${product._id}`}>Update</Link>
                                    <button className="bg-red-500 px-4 py-2 rounded-lg hover:shadow-2xl hover:bg-red-700" onClick={handleDelete(product._id)}>Remove</button>
                                </td>
                            </tr>
                        })
                    }

                </tbody>
            </table>
        </>
    )
}

export default page