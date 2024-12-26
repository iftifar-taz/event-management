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
import { LoginForm } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { loginForm } from "@/lib/validations";
import { useUserStore } from "@/store/userStore";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AxiosError } from "axios";
import { PasswordInput } from "@/components/ui/password-input";
import { createSessoin } from "@/services/session.service";
import AuthLayout from "@/components/layouts/AuthLayout";
import env from "@/lib/validateEnv";
import { useSessionStore } from "@/store/sessionStore";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const { setIsAuthenticated, setIsAdmin } = useSessionStore();
  const authorizedEmails = env.VITE_AUTHORIZED_EMAILS.split(",");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      const result = await createSessoin(data);
      if (result?.id) {
        setIsAuthenticated(!!result);
        setIsAdmin(authorizedEmails.includes(result?.email));
        setUser(result || null);
        setLoading(false);
        navigate("/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
    } finally {
      setLoading(false);
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
                  <PasswordInput {...field} placeholder="Password" />
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

export default Login;
