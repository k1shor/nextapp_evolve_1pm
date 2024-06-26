'use client'
import { getAllCategories } from "@/app/api/categoryApi";
import { addProduct, getProduct, updateProduct } from "@/app/api/productApi";
import { isAuthenticated } from "@/app/api/userApi";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const addNewProduct = () => {
    let [categories, setCategories] = useState([])
    let [product, setProduct] = useState({
        title: '',
        price: '',
        description: '',
        count_in_stock: '',
        category: '',
        product_image: '',
        formdata: new FormData
    })
    let id = useParams()?.id


    let sel_ref = useRef()
    let file_ref = useRef()

    let [token, setToken] = useState('')

    let { title, price, description, count_in_stock, category,product_image,  formdata } = product

    const handleChange = e => {
        if (e.target.name === "image") {
            formdata.set("imageUrl",product_image)
            formdata.set("product_image", e.target.files[0])
        }
        else {
            formdata.set(e.target.name, e.target.value)
            setProduct({ ...product, [e.target.name]: e.target.value })
        }
    }

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

        isAuthenticated()
            .then(data => setToken(data.token))

        if(id){
            getProduct(id)
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }
                else{
                    console.log(data)
                    setProduct({...data, formdata: new FormData})
                    sel_ref.current.value = data.category._id
                }
            })
        }
    }, [id])

    const handleSubmit = e => {
        e.preventDefault()
        updateProduct(id, formdata, token)
            .then(data => {
                if (data.error) {
                    Swal.fire('error', data.error, 'error')
                }
                else {
                    Swal.fire('Congrats!', 'Product Updated Successfully')
                    // setProduct({
                    //     title: '',
                    //     price: '',
                    //     description: '',
                    //     count_in_stock: '',
                    //     category: '',
                    //     formdata: new FormData
                    // })
                    // sel_ref.current.value = ''
                    // file_ref.current.value = ''
                }
            })
    }


    return (<>
        {/* <div class="flex justify-center m-5">
    <button id="defaultModalButton" data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
    Create product
    </button>
</div> */}

        <div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div class="relative w-full max-w-2xl h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Add Product
                        </h3>
                        {/* <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button> */}
                    </div>
                    <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-2">
                            <div>
                                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" name="title" onChange={handleChange} id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type product name" required="" value={title}/>
                            </div>
                            <div>
                                <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Count in Stock</label>
                                <input type="number" name="count_in_stock" onChange={handleChange} id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Count in Stock" required="" value={count_in_stock}/>
                            </div>
                            <div>
                                <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input type="number" name="price" onChange={handleChange} id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$2999" required="" value={price}/>
                            </div>
                            <div>
                                <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="category" onChange={handleChange} ref={sel_ref}>
                                    <option selected="" value=''>Select category</option>
                                    {
                                        categories.length > 0 &&
                                        categories.map(category => {
                                            return <option value={category._id} key={category._id}>{category.category_name}</option>
                                        })
                                    }



                                </select>
                            </div>

                            <div className="sm:col-span-2">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" name="image" onChange={handleChange} ref={file_ref}/>

                            </div>

                            <div class="sm:col-span-2">
                                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here" name="description" onChange={handleChange} value={description}></textarea>
                            </div>
                        </div>
                        <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>
                            <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Add new product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </>);
}

export default addNewProduct;