'use client';

import { FormEvent } from 'react';
import * as z from 'zod';
import axios from 'axios';

const CustomerRegisterSchema = z.object({
    email: z.email({ error: "invalid email format" }),
    fullName: z.string().min(5, { error: "full name must be at least 5 chars long" }),
    username: z.string()
        .min(5, { error: "username must be at least 5 chars long" })
        .max(24, { error: "username must be less than 24 chars long" }),
    password: z.string()
        .min(8, { error: "password must be at least 8 chars long" })
        .regex(/\S*[A-Z]\S*/, { error: "password must contain at least one uppercase letter" }),
    confirmPassword: z.string("confirm password is required"),
    billingAddress: z.string().optional(),
    shippingAddress: z.string().optional(),
    phone: z.string().min(9, { error: "phone must be at least 9 digits long" }),
    gender: z.enum(['male', 'female'], { error: "gender must be either 'male' or 'female'" })
}).refine(data => data.password === data.confirmPassword, {
    error: "Passwords must match",
    path: ["confirmPassword"],
});

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const plain = Object.fromEntries(formData.entries());
    const parsedPayload = CustomerRegisterSchema.safeParse(plain);
    console.log('test');
    
    if (!parsedPayload.success) {
        console.log(parsedPayload.error); 
        // TODO       
    } else {
        const { confirmPassword, ...payload } = parsedPayload.data;
        const res = await axios.post('http://localhost:3000/customer/register', payload);
        console.log(res);
        // TODO
    }
}

export default function RegisterForm() {
    return (
        <form method="post" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>Email</td>
                        <td><input name="email"/> </td>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td><input name="fullName"/></td> 
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td><input name="username"/> </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input name="password" type="password"/></td> 
                    </tr>
                    <tr>
                        <td>Confirm Password</td>
                        <td><input name="confirmPassword" type="password" /></td> 
                    </tr>
                    <tr>
                        <td>Phone</td>
                        <td><input name="phone" required /> </td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>
                            <select name="gender" required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
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
