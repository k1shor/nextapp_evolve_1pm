"use client"
import { change_role, getAllUsers, isAuthenticated } from "@/app/api/userApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

const page = () => {
    let [users, setUsers] = useState([])
    let [token, setToken] = useState('')
    let [success, setSuccess] = useState(false)

    useEffect(() => {
        getAllUsers()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setUsers(data)
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

    const changeRole = (user) => e => {
        e.preventDefault()
      let new_role
      if(user.role === 1){
        new_role = 0
      }
      else{
        new_role = 1
      }

        Swal.fire({
            title: 'Warning',
            text: user.role === 1 ? "REMOVE ADMIN": "MAKE ADMIN",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: "orange"
        })
            .then(result => {
                if (result.isConfirmed) {
                    change_role(user._id, new_role, token)
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
            <Link href={'/admin/users/new'}>Register User </Link>

            <table>
                <thead>
                    <tr>
                        <td>S.No.</td>
                        <td>Username</td>
                        <td>Email</td>
                        <td>Role</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.length > 0 &&
                        users.map((user, i) => {
                            return <tr>
                                <td>{i + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role === 1 ? "ADMIN" : "Customer"}</td>
                                <td>
                                    {/* <Link href={`/admin/category/${category._id}`}>Update</Link> */}
                                    <button className="bg-red-500 px-4 py-2 rounded-lg hover:shadow-2xl hover:bg-red-700" onClick={changeRole(user)}>
                                      {user.role === 1 ? "Remove Admin" : "Make Admin"}
                                    </button>
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