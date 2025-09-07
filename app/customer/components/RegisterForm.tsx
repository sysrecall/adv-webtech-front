'use client';

import * as z from 'zod';
import axios from 'axios';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from 'next/navigation';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
    phone: z.string()
        .min(11, { error: "Phone must be at least 11 digits long" })
        .regex(/^\d+$/, {error: "Phone number must only contain digits"}),
    gender: z.enum(['male', 'female'], { error: "Gender must be either 'male' or 'female'" })
}).refine(data => data.password === data.confirmPassword, {
    error: "Passwords must match",
    path: ["confirmPassword"],
});

async function onSubmit(values: z.infer<typeof customerRegisterSchema>) {
    const {confirmPassword, ...payload} = values;  
    console.log(payload);
    
    await axios.post('http://localhost:3000/customer', payload);
    redirect('http://localhost:8000/customer/login');
}

export default function RegisterForm() {
    const form = useForm<z.infer<typeof customerRegisterSchema>>({
        resolver: zodResolver(customerRegisterSchema),
        defaultValues: {
            email: "",
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            phone: "",
            gender: "male"
        }
    });


    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1 bg-white p-8 w-md rounded-2xl shadow">
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                    <Input type='password' {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                    <RadioGroup onChange={field.onChange} defaultValue={field.value}>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="male" id="r1" />
                                <Label htmlFor="r1">Male</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="female" id="r2" />
                                <Label htmlFor="r2">Female</Label>
                            </div>
                        </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit" className='my-4 w-full'>Register</Button>
        </form>
        </Form>
        // <form method="post" onSubmit={handleSubmit(onSubmit)} className='bg-slate-100 w-[300px] h-[400px] grid justify-between rounded-2xl p-4'>
        //     <table>
        //         <tbody>
        //             <tr>
        //                 <td>
        //                     <input {...register("email")} placeholder='Email'/> 
        //                     {errors.email && <p>{errors.email.message}</p>}

        //                 </td>
        //             </tr>                    
        //             <tr>
        //                 <td>
        //                     <input {...register("fullName")} placeholder='Full Name'/>
        //                     {errors.fullName && <p>{errors.fullName.message}</p>}
        //                 </td> 
        //             </tr>
        //             <tr>
        //                 <td>
        //                     <input  {...register("username")}  placeholder='Username'/> 
        //                     {errors.username && <p>{errors.username.message}</p>}
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <td>
        //                     <input  {...register("password")} type="password" placeholder='Password'/>
        //                     {errors.password && <p>{errors.password.message}</p>}

        //                 </td> 
        //             </tr>
        //             <tr>
        //                 <td>
        //                     <input  {...register("confirmPassword")} type="password" placeholder='Confirm Password'/>
        //                     {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        //                 </td> 
        //             </tr>
        //             <tr>
        //                 <td>
        //                     <input  {...register("phone")} placeholder='Phone' /> 
        //                     {errors.phone && <p>{errors.phone.message}</p>}
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <td>
        //                     <select  {...register("gender")} >
        //                         <option value="">Select Gender</option>
        //                         <option value="male">Male</option>
        //                         <option value="female">Female</option>
        //                     </select>
        //                     {errors.gender && <p>{errors.gender.message}</p>}
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <td>
        //                     <button type="submit">Register</button>
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </form>
    );
}
