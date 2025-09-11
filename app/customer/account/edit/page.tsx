'use client';

import { useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Image from "next/image";

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

    const profilePhotoPath = watch("profilePhotoPath")
    const isActive = watch("isActive")
    const gender = watch("gender")

    const onSubmit = (data: CustomerFormValues) => {
        console.log("Saving customer:", data)
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