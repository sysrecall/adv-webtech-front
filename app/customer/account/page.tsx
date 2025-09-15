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
    profilePhotoPath: string | null
    photo: File | null
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
            photo: null
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
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                formData.append(key, value);
            }
        });

        formData.delete('profilePhotoPath');

        if (Object.keys(data).length == 0) return;
        await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}customer/edit`,
            formData, { withCredentials: true });

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
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-[100px] h-[100px] bg-muted rounded-full overflow-hidden flex items-center justify-center">
                                    {profilePhotoPath ? (
                                        <Image
                                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + profilePhotoPath}
                                            alt="Profile Photo"
                                            width={100}
                                            height={100}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-sm text-muted-foreground">No Photo</span>
                                    )}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('photoInput')?.click();
                                    }}
                                >
                                    Change Photo
                                </Button>
                                <input
                                    hidden
                                    id='photoInput'
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) setValue("photo", file);
                                    }}
                                    className="mt-2"
                                />
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
                        <Button type="reset" variant="outline">
                            Reset
                        </Button>
                        <Button type="submit">Save</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}