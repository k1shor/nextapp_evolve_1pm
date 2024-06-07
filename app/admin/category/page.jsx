"use client"

import { getAllCategories } from "@/app/api/categoryApi"
import Link from "next/link"
import { useEffect, useState } from "react"

const page = () => {
    let [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                }
            })
    }, [])

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
                        categories.map((category, i )=>{
                            return <tr>
                                <td>{i+1}</td>
                                <td>{category.category_name}</td>
                                <td>
                                    <Link href={`/admin/category/${category._id}`}>Update</Link>
                                    <button>Remove</button>
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