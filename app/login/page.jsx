'use client'
import { useState } from "react";
import { authenticate, isAuthenticated, login, register } from "../api/userApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
    let [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    let { email, password } = user

    let router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(user)
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        title: 'Error',
                        text: data.error,
                        icon: 'error',
                        // confirmButtonColor: '#ff0000',
                        // timer: 3000,
                        // timerProgressBar: true,
                        position: 'top-end',
                        // showCancelButton: true
                        // showConfirmButton: false
                    })
                }
                else {
                    // setUser({ username: "", email: "", password: "" })
                    // alert("User Registered Successfully")
                    authenticate(data)

                    isAuthenticated()
                        .then(data => {
                            if (data.user.role == 1) {
                                router.push('/admin/dashboard')
                            }
                            else {
                                router.push('/')
                            }
                        })
                }
            })
    }
    return (<>
        <section class="bg-gray-50 dark:bg-gray-900">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form class="space-y-4 md:space-y-6" action="#">

                            <div>
                                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange} value={email} />
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} value={password} />
                            </div>

                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Remember Me</label>
                                </div>
                            </div>
                            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Login</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Do not have an account? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up Now</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default Login;