import { useForm } from "react-hook-form";
import AuthLayout from "../../components/layouts/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginInputs } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/validations";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const { login, isLoading } = useAuthStore();
  const [error, setError] = useState("");

  const form = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginInputs) => {
    try {
      await login(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  return (
    <AuthLayout header="Login to your account">
      <div className="font-bold text-red-600">{error}</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" autoFocus />
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
                  <Input {...field} placeholder="Password" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isValid || isLoading} type="submit">
            {isLoading ? "..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="mt-5 text-sm/6 text-gray-500 flex justify-between">
        <div>
          <a
            href="#"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Forgot Password?
          </a>
        </div>
        <div>
          Not a member?
          <Link
            to="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500 pl-1"
          >
            Register
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
