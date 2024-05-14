"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { OrgsSelect } from "@/components/pages/appointments/OrgsSelect";
import { RoleSelect } from "@/components/pages/appointments/RoleSelect";
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
import { getOrgsApi } from "@/lib/apis/orgsApi";
import { createUserOrgsApi, getUserOrgsApi } from "@/lib/apis/userApi";
import { AppRoute, ErrorMessages } from "@/lib/constants";
import { UserRole } from "@/lib/types/auth.enum";
import { Organization } from "@/lib/types/org.type";
import { APIErrorResponse } from "@/lib/types/shared.type";
import { UserOrganization } from "@/lib/types/user.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { HomeIcon } from "@radix-ui/react-icons";
import axios, { AxiosError } from "axios";
import { ArrowLeftIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  organizationId: z.string().min(1, "Please select an organization"),
  role: z.string().min(1, "Please select a role"),
  name: z.string().min(1, "Please enter your name"),
});

type FormSchemaType = z.infer<typeof formSchema>;

function Page() {
  const session = useSession();
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      organizationId: "",
      role: "",
      name: "",
    },
  });
  const { reset } = form;

  const [fetching, setFetching] = React.useState<boolean>(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [orgs, setOrgs] = React.useState<Organization[]>([]);
  const [userOrgs, setUserOrgs] = React.useState<UserOrganization[]>([]);

  React.useEffect(() => {
    const fetchOrgs = async () => {
      setFetching(true);
      const { data: orgs } = await getOrgsApi();
      setOrgs(orgs);

      if (session.data?.user.id) {
        const userId = session.data?.user.id;
        const { data: userOrgs } = await getUserOrgsApi(parseInt(userId));
        setUserOrgs(userOrgs);
      }
      setFetching(false);
    };

    fetchOrgs();
  }, [session.data]);

  const onSubmit = async (data: FormSchemaType) => {
    const userId = session.data?.user.id;
    if (!userId) {
      signOut();
      return;
    }
    const resp = await createUserOrgsApi(
      parseInt(userId),
      parseInt(data.organizationId),
      data.role as UserRole,
      data.name
    )
      .catch((ex) => {
        let error = ErrorMessages.SERVICE_ERROR;
        if (axios.isAxiosError(ex)) {
          const axiosError = ex as AxiosError;
          const errorObj = axiosError?.response?.data as APIErrorResponse;
          if (errorObj) {
            error = errorObj.message;
          }
        }
        setFormError(error);
      })
      .finally(() => {
        reset();
      });

    if (resp) {
      router.push(AppRoute.Appointment.New);
    }
  };

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Join organization</h1>
        </div>
        <div className="w-[350px] mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onFocus={() => setFormError(null)}
              className="space-y-4"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="organizationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <OrgsSelect
                          orgs={orgs}
                          defaultValue={parseInt(field.value)}
                          onValueChange={field.onChange}
                          disabledSelect={(org) =>
                            !!userOrgs.find(
                              (userOrg) => userOrg.organizationId === org.id
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <RoleSelect
                          selectedRole={field.value as UserRole}
                          onValueChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your name"
                          {...field}
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {formError && (
                  <div className="flex flex-col space-y-1. text-sm text-destructive text-center">
                    <span>{formError}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Button
                  type="submit"
                  className="w-full"
                  variant="default"
                  disabled={
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    fetching
                  }
                >
                  <HomeIcon className="w-5 h-5 mr-2" />
                  Join
                </Button>

                <Button
                  className="w-full"
                  disabled={
                    !form.formState.isValid ||
                    form.formState.isSubmitting ||
                    fetching
                  }
                  asChild
                  type="button"
                  variant={"outline"}
                >
                  <Link
                    href={AppRoute.Appointment.New}
                    className="flex justify-center"
                  >
                    <ArrowLeftIcon className="w-5 h-5 mr-2" />
                    Back
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Page;
