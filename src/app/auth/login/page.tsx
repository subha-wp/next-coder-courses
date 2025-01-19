"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { login } from "./action";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Phone, Lock } from "lucide-react";

const schema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("password", values.password);

      const result = await login(formData);

      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success("Login successful! Redirecting...");
        router.push(result.route);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md overflow-hidden shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground p-6">
          <CardTitle className="text-3xl font-bold text-center">
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter your phone number"
                          className="rounded-full pl-10"
                        />
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                      </div>
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
                    <FormLabel className="text-sm font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="rounded-full pl-10 pr-10"
                        />
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full rounded-full text-lg font-semibold py-6"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Login <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-semibold hover:underline"
            >
              Register
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
