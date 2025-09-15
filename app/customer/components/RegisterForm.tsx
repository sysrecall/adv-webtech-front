'use client';

import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { Client } from '@pusher/push-notifications-web';


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
        // .min(11, { error: "Phone must be at least 11 digits long" })
        .regex(/^\+\d+$/, { error: "Phone number must only contain digits" }),
    // gender: z.enum(['male', 'female'], { error: "Gender must be either 'male' or 'female'" })
}).refine(data => data.password === data.confirmPassword, {
    error: "Passwords must match",
    path: ["confirmPassword"],
});

async function onSubmit(values: z.infer<typeof customerRegisterSchema>) {
    const { confirmPassword, ...payload } = values;

    await axios.post('http://localhost:3000/customer', payload);

    const beamsClient = new Client({
        instanceId: process.env.NEXT_PUBLIC_PUSHER_BEAMS_INSTANCE_ID!,
    });
    await beamsClient.start();
    await beamsClient.addDeviceInterest(values.username);

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
        }
    });


    return (
        <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Create a new account by filling out the form below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4">
                                {/* Username Field */}
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="username">Username</FormLabel>
                                            <FormControl>
                                                <Input id="username" placeholder="johndoe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Name Field */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="fullName">Full Name</FormLabel>
                                            <FormControl>
                                                <Input id="fullName" placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="email">Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    placeholder="johndoe@mail.com"
                                                    type="email"
                                                    autoComplete="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone Field */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="phone">Phone Number</FormLabel>
                                            <FormControl>
                                                <PhoneInput {...field} defaultCountry="BD" />
                                                {/* <Input
                          id="phone"
                          placeholder="555-123-4567"
                          type="tel"
                          autoComplete="tel"
                          {...field}
                        /> */}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Password Field */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="password">Password</FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    id="password"
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Confirm Password Field */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="grid gap-2">
                                            <FormLabel htmlFor="confirmPassword">
                                                Confirm Password
                                            </FormLabel>
                                            <FormControl>
                                                <PasswordInput
                                                    id="confirmPassword"
                                                    placeholder="******"
                                                    autoComplete="new-password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full">
                                    Register
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{' '}
                        <Link href="login" className="underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
