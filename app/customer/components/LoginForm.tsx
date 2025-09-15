'use client';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { FormEvent, useState } from "react"
import axios, { AxiosError } from "axios";
import { redirect, RedirectType, useRouter } from "next/navigation";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, Terminal } from "lucide-react";



export function LoginForm({
  className,
  ...props

}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    const payload = new FormData(event.currentTarget);

    try {
      await axios.post('http://localhost:3000/customer/login', payload,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      router.push("/arts"); 

    } catch (e) {
      const error = e as AxiosError;
      setMessage(error.response?.statusText ?? null);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  id="username"
                  placeholder="johndoe"
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" placeholder="password" />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {message &&
                <div className="w-full">
                  <Alert variant="destructive">
                    <AlertCircleIcon />
                    <AlertTitle>{message}</AlertTitle>
                  </Alert>
                </div>
              }
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/imgs/tackled.jpg"
              alt="Image" fill={true}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
