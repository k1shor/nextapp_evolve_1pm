"use client"
import { editCategory, getCategoryDetails } from '@/app/api/categoryApi'
import { isAuthenticated } from '@/app/api/userApi'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const page = () => {
    let [category_name, setCategoryName] = useState("")
    let [token, setToken] = useState('')

    let id = useParams()?.id

    useEffect(()=>{

        console.log(id)
        isAuthenticated()
        .then(data=>{
                setToken();
        })

        getCategoryDetails(id)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategoryName(data.category_name)
            }
        })
    },[])

    const handleSubmit = () =>{
        console.log(token)
        editCategory(id,{category_name}, token)
        .then(data=>{
            console.log(data)
            if(data.error){
                Swal.fire('Error', data.error, 'error')
            }
            else{
                Swal.fire("Congrats","Category Updated","success")
            }
        })
    }

    return (
        <>
            <div className='p-5 rounded-lg shadow-xl w-1/2'>
                <h1 className='text-center underline font-3xl'>Update Category</h1>

                <div>
                    <label for="category_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category name</label>
                    <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required onChange={e=>setCategoryName(e.target.value)} value={category_name}/>


                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2 w-full" onClick={handleSubmit}>Update Category</button>

                </div>
            </div>

        </>
    )
}

export default page
