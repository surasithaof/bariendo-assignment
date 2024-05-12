"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
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
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { set, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import { login } from "@/lib/auth/auth";
import { AppRoute, ErrorMessages } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { APIErrorResponse } from "@/lib/types/shared.type";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

type FormSchemaType = z.infer<typeof formSchema>;

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sesssion = useSession();
  const [loginError, setLoginError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (sesssion?.status === "authenticated") {
      router.push(AppRoute.Home);
    }
  }, [router, sesssion]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { reset } = form;

  React.useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      setLoginError(error);
    }
  }, [searchParams]);

  const onSubmit = async (data: FormSchemaType) => {
    const loginResp = await login({
      email: data.email,
      password: data.password,
    })
      .catch((ex) => {
        let error = ErrorMessages.SERVICE_ERROR;
        if (axios.isAxiosError(ex)) {
          const axiosError = ex as AxiosError;
          const errorObj = axiosError?.response?.data as APIErrorResponse;
          if (errorObj) {
            error = errorObj.message;
          }
        }
        setLoginError(error);
        router.push("?error=" + error);
      })
      .finally(() => {
        reset();
      });

    if (loginResp) {
      const callbackUrl = searchParams.get("callbackUrl") || AppRoute.Home;
      await signIn("token", {
        accessToken: loginResp.accessToken,
        refreshToken: loginResp.refreshToken,
        redirect: true,
        callbackUrl: callbackUrl,
      });
    }
  };

  return (
    <ContentWrapper>
      <div className="w-fit mx-auto my-20">
        <Card className="w-[350px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onFocus={() => setLoginError(null)}
            >
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
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
                          <Input
                            placeholder="Enter your password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col space-y-1. text-sm">
                    <span>
                      {`Don't have an account? `}
                      <a href="/auth/sign-up" className="text-blue-500">
                        Sign Up
                      </a>
                    </span>
                  </div>

                  {loginError && (
                    <div className="flex flex-col space-y-1. text-sm text-destructive text-center">
                      <span>{loginError}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="submit"
                  className="w-full"
                  variant="default"
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                >
                  Sign In
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </ContentWrapper>
  );
}

export default Page;
