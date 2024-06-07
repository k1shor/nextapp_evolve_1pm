'use client'

import { verify } from "@/app/api/userApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Verify = () => {
    let token = useParams()?.token
    let [success, setSuccess] = useState('')
    let [error, setError] = useState('')

    let router = useRouter()

    useEffect(() => {
        if (token) {
            verify(token)
                .then(data => {
                    if (data.error) {
                        // alert(data.error)

                        setError(data.error)
                    }
                    else {
                        // alert(data.message)
                        setSuccess(data.message)
                    }
                })
        }
    }, [token])

    const showError = () => {
        if (error) {
            console.log(error)

            Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                // confirmButtonColor: '#ff0000',
                // timer: 3000,
                // timerProgressBar: true,
                position: 'top-end',
                showCancelButton: true
                // showConfirmButton: false
            })
        }
    }
    const showSuccess = () => {
        if (success) {
            console.log(success)

            Swal.fire('Congrats!', data.message, 'success')
        }
    }



    return (<>
        {showError()}
        {showSuccess()}
    </>);
}

export default Verify;




