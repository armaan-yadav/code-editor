import React, { useState } from 'react'
import { motion } from "framer-motion"
import { useForm } from 'react-hook-form'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const Auth = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [shwoPassword, setShowPassword] = useState(false)
    const handleFormSubmit = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(data)
    }

    return (
        <div className='h-screen w-screen text-white flex items-center justify-center'>
            <form className='flex  flex-col gap-3 w-4/12' onSubmit={handleSubmit(handleFormSubmit)}>
                <div className='flex flex-col '>
                    Username
                    <input
                        {...register("username", { required: { value: true, message: "Username is required" }, minLength: { value: 4, message: "Username must be at least 4 characters" }, })}
                        type="text" className='outline-none bg-secondary border-b-2 border-b-white px-2 py-1' />

                    {errors.username && <p className='text-red-600 text-sm'>{errors.username.message}</p>}
                </div>
                <div className='flex flex-col '>
                    Email
                    <input
                        {...register("email", {
                            required: true
                        })}
                        type="email" className='outline-none bg-secondary border-b-2 border-b-white px-2 py-1' />
                    {errors.email && <p className='text-red-600 text-sm'>{errors.email.message}</p>}

                </div>
                <div className='flex flex-col relative'>
                    Password
                    <input
                        {...register("password", {
                            required: true,
                            minLength: {
                                value: 4, message: "Password must be 8 characters long"
                            }
                        })}
                        type={shwoPassword ? `text` : "password"} className='outline-none bg-secondary border-b-2 border-b-white px-2 py-1' />
                    <button className="absolute top-7 translate-y-1 right-1   ">
                        {
                            !shwoPassword ? <IoEyeSharp onClick={() => setShowPassword(!shwoPassword)} /> : <FaEyeSlash onClick={() => setShowPassword(!shwoPassword)} />
                        }
                    </button>
                    {errors.password && <p className='text-red-600 text-sm'>{errors.password.message}</p>}
                </div>

                <motion.button whileTap={{ scale: .9 }} className='w-full bg-emerald-500 hover:bg-emerald-700 duration-200 py-2 rounded-md'>{isSubmitting ? "Loading..." : 'Sign up'}</motion.button>
            </form>
        </div>
    )
}

export default Auth