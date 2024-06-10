"use client"
import { deleteCategory, getAllCategories } from "@/app/api/categoryApi"
import { isAuthenticated } from "@/app/api/userApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const page = () => {
    let [categories, setCategories] = useState([])
    let [token, setToken] = useState('')
    let [success, setSuccess] = useState(false)

    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
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
            text: 'Are you sure you want to delete this category?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonColor: "orange"
        })
            .then(result => {
                if (result.isConfirmed) {
                    deleteCategory(id, token)
                        .then(data => {
                            if (data.error) {
                                Swal.fire('Error', data.error, 'error')
                            }
                            else {
                                setSuccess(true)
                                Swal.fire('Success', "Category deleted successfully", 'success')
                            }
                        })
                }
            })
    }


    return (
        <>
            <h1 className="text-2xl underline font-bold">Categories</h1>
            <Link href={'/admin/category/new'}>Add New Category </Link>

            <table>
                <thead>
                    <tr>
                        <td>S.No.</td>
                        <td>Category Name</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.length > 0 &&
                        categories.map((category, i) => {
                            return <tr>
                                <td>{i + 1}</td>
                                <td>{category.category_name}</td>
                                <td>
                                    <Link href={`/admin/category/${category._id}`}>Update</Link>
                                    <button className="bg-red-500 px-4 py-2 rounded-lg hover:shadow-2xl hover:bg-red-700" onClick={handleDelete(category._id)}>Remove</button>
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