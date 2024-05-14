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
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterPayload } from "@/lib/types/auth.type";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { AppRoute, ErrorMessages } from "@/lib/constants";
import { register } from "@/lib/auth/auth";
import { APIErrorResponse } from "@/lib/types/shared.type";
import axios, { AxiosError } from "axios";

const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    // acceptTerms: z.boolean().refine((value) => value === true, {
    // message: "Please accept the terms",
    // }),
    acceptTerms: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "Please accept the terms",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

type FormSchemaType = z.infer<typeof formSchema>;

function Page() {
  const searchParams = useSearchParams();
  const session = useSession();
  const router = useRouter();
  const [registerError, setRegisterError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (session?.status === "authenticated") {
      router.push(AppRoute.Home);
    }
  }, [router, session]);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: [],
    },
  });
  const { reset } = form;

  const onSubmit = async (data: FormSchemaType) => {
    const { email, password } = data;
    const payload: RegisterPayload = {
      email,
      password,
    };
    const registerResp = await register(payload)
      .catch((ex) => {
        let error = ErrorMessages.SERVICE_ERROR;
        if (axios.isAxiosError(ex)) {
          const axiosError = ex as AxiosError;
          const errorObj = axiosError?.response?.data as APIErrorResponse;
          if (errorObj) {
            error = errorObj.message;
          }
        }
        setRegisterError(error);
      })
      .finally(() => {
        reset();
      });

    if (registerResp) {
      const callbackUrl = searchParams.get("callbackUrl") || AppRoute.Home;
      await signIn("token", {
        accessToken: registerResp.accessToken,
        refreshToken: registerResp.refreshToken,
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
              onFocus={() => setRegisterError(null)}
            >
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Confirm your password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                          <FormControl>
                            <Checkbox
                              {...field}
                              checked={field.value?.includes("accepted")}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, "accepted"])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== "accepted"
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel htmlFor="terms">
                            I agree to the{" "}
                            <a
                              href="/tos"
                              className="text-blue-500"
                              target="_blank"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              href="/privacy"
                              className="text-blue-500"
                              target="_blank"
                            >
                              Privacy Policy
                            </a>
                          </FormLabel>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {registerError && (
                    <div className="flex flex-col space-y-1. text-sm text-destructive text-center">
                      <span>{registerError}</span>
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
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Sign Up
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
