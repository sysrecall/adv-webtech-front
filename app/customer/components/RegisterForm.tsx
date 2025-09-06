'use client';

import { FormEvent, useState } from 'react';
import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const customerRegisterSchema = z.object({
    email: z.email({ error: "Invalid email format" }),
    fullName: z.string().min(5, { error: "Full name must be at least 5 chars long" }),
    username: z.string()
        .min(5, { error: "Username must be at least 5 chars long" })
        .max(24, { error: "Username must be less than 24 chars long" }),
    password: z.string()
        .min(8, { error: "Password must be at least 8 chars long" })
        .regex(/\S*[A-Z]\S*/, { error: "Password must contain at least one uppercase letter" }),
    confirmPassword: z.string("Confirm password is required"),
    billingAddress: z.string().optional(),
    shippingAddress: z.string().optional(),
    phone: z.string().min(9, { error: "Phone must be at least 9 digits long" }),
    gender: z.enum(['male', 'female'], { error: "Gender must be either 'male' or 'female'" })
}).refine(data => data.password === data.confirmPassword, {
    error: "Passwords must match",
    path: ["confirmPassword"],
});

async function onSubmit(payload: z.infer<typeof customerRegisterSchema>) {
    const res = await axios.post('http://localhost:3000/customer', payload);
    console.log(res.status);
}

export default function RegisterForm() {
    const {register, handleSubmit, formState: {errors}} = useForm<z.infer<typeof customerRegisterSchema>>({
        resolver: zodResolver(customerRegisterSchema),
    });


    return (
        <form method="post" onSubmit={handleSubmit(onSubmit)} className='bg-slate-100 w-fit h-fit rounded-2xl p-4'>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input {...register("email")} placeholder='Email'/> 
                            {errors.email && <p>{errors.email.message}</p>}

                        </td>
                    </tr>                    
                    <tr>
                        <td>
                            <input {...register("fullName")} placeholder='Full Name'/>
                            {errors.fullName && <p>{errors.fullName.message}</p>}
                        </td> 
                    </tr>
                    <tr>
                        <td>
                            <input  {...register("username")}  placeholder='Username'/> 
                            {errors.username && <p>{errors.username.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input  {...register("password")} type="password" placeholder='Password'/>
                            {errors.password && <p>{errors.password.message}</p>}

                        </td> 
                    </tr>
                    <tr>
                        <td>
                            <input  {...register("confirmPassword")} type="password" placeholder='Confirm Password'/>
                            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                        </td> 
                    </tr>
                    <tr>
                        <td>
                            <input  {...register("phone")} placeholder='Phone' /> 
                            {errors.phone && <p>{errors.phone.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select  {...register("gender")} >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <p>{errors.gender.message}</p>}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Register</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}
