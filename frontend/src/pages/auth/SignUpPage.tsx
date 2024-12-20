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
import { SignInInputs, SignUpInputs } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/lib/validations";
import { useAuthStore } from "@/store/authStore";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { signup, isLoading, error } = useAuthStore();

  const form = useForm<SignUpInputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignInInputs) => {
    await signup(data);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col items-center">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="h-10"
        />
        <h2 className="mt-10 text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign up to our site
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Confirm Password"
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!form.formState.isValid || isLoading}
              type="submit"
            >
              {isLoading ? "Signing up" : "Sign up"}
            </Button>
          </form>
        </Form>

        <div className="mt-5 text-sm/6 text-gray-500 flex justify-between">
          <div>
            Already a member?
            <Link
              to="/sign-in"
              className="font-semibold text-indigo-600 hover:text-indigo-500 pl-1"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
