"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Chrome,
  Github,
  Loader,
  Lock,
  UserPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import { FormFieldTypes } from "@/config/enums";
import { useAuth } from "@/hooks/use-auth";
import { RegisterSchema, RegisterSchemaType } from "@/lib/validations";

import { CustomFormField } from "../shared/custom-form-field";
import { Button } from "../ui/button";
import { Form } from "../ui/form";

export default function SignUpForm() {
  const { useRegisterMutation } = useAuth();
  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
    },
  });
  const { isPending, mutate: RegisterMutation } = useRegisterMutation();

  const handleSubmit = (values: RegisterSchemaType) => {
    RegisterMutation(values, {
      onSuccess: () => {
        router.refresh();
        router.push("/");
      },
    });
  };
  type SocialButtonProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    name: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  };

  const SocialButton: React.FC<SocialButtonProps> = ({
    icon: Icon,
    name,
    onClick,
  }) => (
    <Button
      type="button"
      disabled={isPending}
      onClick={onClick}
      className="group dark:bg-dark-300 dark:border-dark-500 flex h-[48px] flex-1 cursor-pointer items-center justify-center rounded-xl border-2 border-gray-300 bg-white/50 px-4 py-3 backdrop-blur-sm transition-all duration-200 hover:border-gray-400 hover:bg-white/70"
    >
      <Icon className="h-5 w-5 text-gray-600 group-hover:text-gray-800 dark:text-white" />
      <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-800 dark:text-white">
        {name}
      </span>
    </Button>
  );

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="w-full max-w-lg">
        {/* Floating card effect */}
        <div className="transform rounded-2xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] dark:border-gray-700/20 dark:bg-gray-800/80">
          {/* Header with animation */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <h1 className="mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join us today and start your journey
            </p>
          </div>
          {/* Social Login Options */}
          <div className="mb-6">
            <div className="mb-4 flex gap-3">
              <SocialButton
                icon={Chrome}
                name="Google"
                onClick={() => handleSocialLogin("Google")}
              />
              <SocialButton
                icon={Github}
                name="GitHub"
                onClick={() => handleSocialLogin("GitHub")}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white/80 px-4 text-gray-500 dark:bg-gray-800/80 dark:text-gray-400">
                  Or create account with email
                </span>
              </div>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-10"
            >
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-4">
                <CustomFormField
                  control={form.control}
                  name="firstname"
                  label="First Name"
                  fieldType={FormFieldTypes.INPUT}
                  inputType="text"
                  disabled={isPending}
                  placeholder="Enter your first name"
                  className="h-[48px] dark:border-gray-300 dark:bg-transparent dark:text-white dark:hover:bg-transparent"
                />
                <CustomFormField
                  control={form.control}
                  name="lastname"
                  label="Last Name"
                  fieldType={FormFieldTypes.INPUT}
                  inputType="text"
                  disabled={isPending}
                  placeholder="Enter your last name"
                  className="h-[48px] dark:border-gray-300 dark:bg-transparent dark:text-white dark:hover:bg-transparent"
                />
              </div>

              <CustomFormField
                control={form.control}
                name="email"
                label="Email"
                disabled={isPending}
                fieldType={FormFieldTypes.INPUT}
                inputType="email"
                placeholder="Please enter your email address"
                className="h-[48px] dark:border-gray-300 dark:bg-transparent dark:text-white dark:hover:bg-transparent"
              />
              <CustomFormField
                control={form.control}
                name="password"
                disabled={isPending}
                label="Password"
                fieldType={FormFieldTypes.PASSWORD}
                // disabled={isLoggingIn}
                placeholder="Create a strong password"
                className="h-[48px] dark:border-gray-300 dark:bg-transparent dark:text-white dark:hover:bg-transparent"
              />

              <CustomFormField
                control={form.control}
                name="confirmPassword"
                label="Confirm Password"
                fieldType={FormFieldTypes.PASSWORD}
                disabled={isPending}
                placeholder="Confirm your password"
                className="h-[48px] dark:border-gray-300 dark:bg-transparent dark:text-white dark:hover:bg-transparent"
              />
              {/* Password Requirements */}
              {/* <div className="rounded-lg bg-gray-50 p-4 text-xs dark:bg-gray-700/50">
                <div className="mb-2 flex items-center text-gray-700 dark:text-gray-300">
                  <Shield className="mr-2 h-4 w-4" />
                  <span className="font-medium">Password Requirements:</span>
                </div>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div> */}
              <Button
                type="submit"
                className="mt-10 flex h-[48px] w-full cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader className="mr-2 h-5 w-5 animate-spin" />
                    Signing up...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
            {/* Sign up link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Button
                  variant={"link"}
                  disabled={isPending}
                  type="button"
                  onClick={() => console.log("Sign in clicked")}
                  className="cursor-pointer !p-0 font-semibold text-blue-600 underline transition-colors duration-200 hover:text-blue-700 hover:underline"
                >
                  Sign in here
                </Button>
              </p>
            </div>

            {/* Security badge */}
            <div className="mt-6 flex items-center justify-center text-xs text-gray-500 dark:text-gray-400">
              <Lock className="mr-1 h-3 w-3" />
              Your information is secure and encrypted
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
