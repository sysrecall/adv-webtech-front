'use client';

import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Image from "next/image";
import axios, { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CustomerFormValues {
    username: string
    email: string
    fullName: string
    billingAddress: string
    shippingAddress: string
    phone: string
    gender: string
    isActive: boolean
    profilePhotoPath: string | null
}

export default function CustomerAccountEdit() {
    const { register, handleSubmit, setValue, watch, reset } = useForm<CustomerFormValues>({
        defaultValues: {
            username: "",
            email: "",
            fullName: "",
            billingAddress: "",
            shippingAddress: "",
            phone: "",
            gender: "",
            profilePhotoPath: null,
        },
    })

    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}customer/`, { withCredentials: true });
                reset(res.data);
            } catch (err) {
                if (err instanceof AxiosError)
                    if (err.status === 401)
                        router.push('/customer/login');

                console.log(err);
            }
        }
        fetchUser();
    }, [reset]);

    const profilePhotoPath = watch("profilePhotoPath");
    const gender = watch("gender");

    const onSubmit = async (data: CustomerFormValues) => {
        const cleaned = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => {
                if (typeof value === "string") {
                    return value.trim() !== ""
                }
                return value !== null && value !== undefined
            })
        )

        if (Object.keys(cleaned).length == 0) return;
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}customer/edit`, cleaned, { withCredentials: true });
    }

    return (
        <div>
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Customer Profile</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="grid gap-6">
                        {/* Profile Photo */}
                        {
                            <div className="flex justify-center w-[100px] h-[100px] bg-muted">
                                {profilePhotoPath && (<Image
                                    src={profilePhotoPath}
                                    alt="Profile Photo"
                                    width={100}
                                    height={100}
                                    className="rounded-full object-cover"
                                />
                                )}
                            </div>
                        }

                        {/* Username */}
                        <div className="grid gap-2">
                            <Label>Username</Label>
                            <Input {...register("username")} placeholder="Enter username" />
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input type="email" {...register("email")} placeholder="Enter email" />
                        </div>

                        {/* Full Name */}
                        <div className="grid gap-2">
                            <Label>Full Name</Label>
                            <Input {...register("fullName")} placeholder="Enter full name" />
                        </div>

                        {/* Billing Address */}
                        <div className="grid gap-2">
                            <Label>Billing Address</Label>
                            <Input {...register("billingAddress")} placeholder="Enter billing address" />
                        </div>

                        {/* Shipping Address */}
                        <div className="grid gap-2">
                            <Label>Shipping Address</Label>
                            <Input {...register("shippingAddress")} placeholder="Enter shipping address" />
                        </div>

                        {/* Phone */}
                        <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input {...register("phone")} placeholder="Enter phone number" />
                        </div>

                        {/* Gender */}
                        <div className="grid gap-2">
                            <Label>Gender</Label>
                            <Select value={gender} onValueChange={val => setValue("gender", val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </CardContent>

                    <CardFooter className="flex justify-end gap-4">
                        <Button type="reset" variant="outline" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button type="submit">Save</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}