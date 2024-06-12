import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../api/categoryApi'

const CategoryCheckbox = () => {
    let [categories, setCategories] = useState([])

    useEffect(()=>{
        getAllCategories()
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                setCategories(data)
            }
        })
    },[])
  return (
    <>
    <h1 className='text-2xl underline font-bold'>Categories</h1>
    {
        categories.length>0 && categories.map(category=>{
            return <div class="flex items-center mb-4">
            <input id={category._id} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
            value = {category._id}/>
            <label for={category._id} class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category.category_name}</label>
        </div>
        })
    }
    
    </>
  )
}

export default CategoryCheckbox