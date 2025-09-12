"use client";
import { useState, useRef, useEffect } from "react";
import { z, ZodIssue } from "zod";
import Link from "next/link";
import api from "@/lib/axios";
import { useRouter } from "next/navigation"; // for redirect

// Zod schema
const loginSchema = z.object({
  username: z.string().min(1, "Username is required").max(50, "Username must be 50 characters or less"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

interface LoginData {
  username: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginData>({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
  const [message, setMessage] = useState("");
  const isMounted = useRef(true);
  const router = useRouter();

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMounted.current) return;

    setErrors({});
    setMessage("");

    // validate
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginData, string>> = {};
      result.error.issues.forEach((err: ZodIssue) => {
        const field = err.path[0] as keyof LoginData;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Important: enable credentials so cookies are stored
      const res = await api.post(
        "/admin/signin",
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      if (isMounted.current) {
        setMessage("Login successful!");

        router.push("/admin/dashboard"); 
      }
    } catch (err: any) {
      if (isMounted.current) {
        setMessage(err?.response?.data?.message || "Login failed!");
      }
      console.error("API Error:", err);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-6">
          {message && (
            <div className={`p-3 rounded ${message.includes("failed") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              {message}
            </div>
          )}

          <h1 className="text-center text-3xl font-extrabold text-gray-900">Login Page</h1>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              className={`w-full px-3 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>

          <div className="text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-500 text-sm font-medium">← Back to Home</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
