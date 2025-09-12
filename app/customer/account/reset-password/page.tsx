'use client';

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
import { PasswordInput } from '@/components/ui/password-input';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon, CheckCircle2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const customerChangePasswordSchema = z.object({
  password: z.string(),
  newPassword: z.string("Confirm password is required")
    .min(8, { error: "Password must be at least 6 chars long" })
    .regex(/\S*[A-Z]\S*/, { error: "Password must contain at least one uppercase letter" }),
});

export default function CustomerResetPassword() {
  const [message, setMessage] = useState<{ type: string, text: string } | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof customerChangePasswordSchema>>({
    resolver: zodResolver(customerChangePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
    },
  })

  interface ErrorResponse {
    message: string;
  }

  async function onSubmit(values: z.infer<typeof customerChangePasswordSchema>) {
    setMessage(null);
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}customer/change-password`, values,
        {
          withCredentials: true
        }
      );
      form.reset();
      setMessage({ type: 'success', text: "Password Updated!" });
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      if (error.response?.status === 401) {
        router.push("/customer/login");
      }
      setMessage({ type: 'error', text: error.response?.data.message ?? error.message });
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Change Password</CardTitle>
          <CardDescription>
            Enter your new password to change your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* New Password Field */}
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
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="newPasword">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="newPassword"
                          placeholder="******"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Change Password
                </Button>
                {message &&
                  <div className="w-full">
                    <Alert variant={message.type === 'error' ? "destructive" : "default"}>
                      {message.type === 'error'
                        ?
                        <AlertCircleIcon />
                        :
                        <CheckCircle2Icon />
                      }
                      <AlertTitle>{message.text}</AlertTitle>
                    </Alert>
                  </div>
                }
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
