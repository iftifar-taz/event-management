import { useForm } from "react-hook-form";
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
import { RegisterForm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { registerForm } from "@/lib/validations";
import { useAuthStore } from "@/store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { PasswordInput } from "@/components/ui/password-input";
import { createUser } from "@/services/user.service";
import AuthLayout from "@/components/layouts/AuthLayout";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      const result = await createUser(data);
      if (result?.id) {
        setUser(result);
        setIsLoading(false);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        console.log(error);
        setError(error.response?.data.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout header="Register to our site">
      <div className="font-bold text-red-600">{error}</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Name" autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <PasswordInput {...field} placeholder="Password" />
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
                  <PasswordInput {...field} placeholder="Confirm Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={!form.formState.isValid || isLoading} type="submit">
            {isLoading ? "..." : "Register"}
          </Button>
        </form>
      </Form>

      <div className="mt-5 text-sm/6 text-gray-500 flex justify-between">
        <div>
          Already a member?
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500 pl-1"
          >
            Login
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
