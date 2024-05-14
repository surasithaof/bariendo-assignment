"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { UserOrgsSelect } from "@/components/pages/appointments/UserOrgsSelect";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { getUserOrgsApi } from "@/lib/apis/userApi";
import { AppRoute } from "@/lib/constants";
import { UserOrganization } from "@/lib/types/user.type";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { HomeIcon } from "@radix-ui/react-icons";
import {
  createAppointmentApi,
  getAppointmentsApi,
} from "@/lib/apis/appointmentApi";
import { useRouter } from "next/navigation";
import { UserRole } from "@/lib/types/auth.enum";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import HourSelect from "@/components/pages/appointments/HourSelect";
import { getDoctorsApi } from "@/lib/apis/doctorApi";
import { Doctor } from "@/lib/types/doctor.type";
import { DoctorSelect } from "@/components/pages/appointments/DoctorSelect";

const formSchema = z.object({
  userOrgId: z.string().min(1, "Please select an organization"),
  doctorId: z.string().min(1, "Please select a doctor"),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, "Please select time"),
  period: z.string().min(1, "Please select period"),
});

type FormSchemaType = z.infer<typeof formSchema>;

function Page() {
  const router = useRouter();
  const session = useSession();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      userOrgId: "",
      doctorId: "",
      date: undefined,
      time: "",
      period: "",
    },
  });
  const { watch } = form;
  const [userOrgId, date] = watch(["userOrgId", "date"]);

  const [userOrgs, setUserOrgs] = React.useState<UserOrganization[]>([]);

  React.useEffect(() => {
    const fetchOrgs = async () => {
      if (session?.data?.user?.id) {
        const userId = session.data?.user.id;
        const { data: userOrgs } = await getUserOrgsApi(parseInt(userId));
        setUserOrgs(userOrgs);
      } else {
        setUserOrgs([]);
      }
    };
    fetchOrgs();
  }, [session.data]);

  React.useEffect(() => {
    const fetchDoctors = async () => {
      const org = userOrgs.find((uo) => uo.id.toString() === userOrgId);
      if (userOrgId && org) {
        const resp = await getDoctorsApi(org.organizationId);
        setDoctors(resp.data);
      } else {
        setDoctors([]);
      }
    };
    fetchDoctors();
  }, [userOrgs, userOrgId]);

  React.useEffect(() => {
    const fetchAvailableAppointments = async () => {
      const org = userOrgs.find((uo) => uo.id.toString() === userOrgId);
      if (userOrgId && date && org) {
        const startDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,
          0
        );
        const endDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          23,
          59
        );

        const resp = await getAppointmentsApi(
          org.organizationId,
          startDate,
          endDate
        );
        const booked = resp.data.map((a) => new Date(a.date));
        setBookedAppointments(booked);
      } else {
        setBookedAppointments([]);
      }
    };
    fetchAvailableAppointments();
  }, [userOrgs, userOrgId, date]);

  const [bookedAppointments, setBookedAppointments] = React.useState<Date[]>(
    []
  );

  const [doctors, setDoctors] = React.useState<Doctor[]>([]);
  const [formError, setFormError] = React.useState<string | null>(null);

  const onSubmit = async (data: FormSchemaType) => {
    const org = userOrgs.find((uo) => uo.id.toString() === data.userOrgId);
    if (!org) {
      return;
    }
    const userId = session.data?.user.id;
    if (!userId) {
      return;
    }

    let appointmentTime = parseInt(data.time);
    if (data.period === "PM") {
      appointmentTime += 12;
    }
    const appointmentDate = new Date(
      data.date.getFullYear(),
      data.date.getMonth(),
      data.date.getDate(),
      appointmentTime,
      0
    );

    const userOrg = userOrgs.find(
      (uo) =>
        uo.role === UserRole.Patient && uo.organizationId === org.organizationId
    );
    if (!userOrg || !userOrg.patient?.id) {
      setFormError("Failed to create appointment");
      return;
    }

    const resp = await createAppointmentApi(
      appointmentDate,
      org?.organizationId,
      userOrg.patient.id,
      parseInt(data.doctorId)
    ).catch((err) => {
      console.log(err.response.data);
      setFormError("Failed to create appointment");
    });

    if (resp?.data?.id) {
      router.replace(
        AppRoute.Appointment.Detail.replace(":id", resp.data.id.toString())
      );
    }
  };

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Booking Appointments</h1>
        </div>
        <div className="flex flex-col gap-y-2 md:w-fit mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              onFocus={() => setFormError(null)}
            >
              <div className="flex flex-col gap-4 ">
                <FormField
                  control={form.control}
                  name="userOrgId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex flex-col md:flex-row gap-4 w-full">
                          <div className="basis-2/3">
                            <UserOrgsSelect
                              userOrgs={userOrgs}
                              defaultValue={parseInt(field.value)}
                              onValueChange={field.onChange}
                              disabledSelect={(uo) => {
                                return uo.role === UserRole.Doctor;
                              }}
                            />
                          </div>
                          <div className="basis-1/3">
                            <Button
                              className="w-full"
                              asChild
                              type="button"
                              variant="outline"
                            >
                              <Link
                                href={AppRoute.Org.Join}
                                className="flex justify-center"
                              >
                                <HomeIcon className="w-5 h-5 mr-2" />
                                Join
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-center" />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            form.setValue("time", "");
                            form.setValue("period", "");
                            field.onChange(date);
                          }}
                          className="rounded-md border w-fit  mx-auto"
                          disabled={(date) => {
                            const now = new Date();
                            const today = new Date(
                              now.getFullYear(),
                              now.getMonth(),
                              now.getDate()
                            );
                            return date < today;
                          }}
                          showOutsideDays={false}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-row gap-2 w-full">
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="period"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                form.setValue("time", "");
                                field.onChange(value);
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Period" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Period</SelectLabel>
                                  {["AM", "PM"].map((p, i) => (
                                    <SelectItem key={`period-${p}`} value={p}>
                                      {p}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="basis-1/2">
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <HourSelect
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                              disabledSelect={(hour) => {
                                const period = form.getValues("period");
                                const date = form.getValues("date");
                                const userOrgId = form.getValues("userOrgId");

                                if (!period || !date || !userOrgId) {
                                  return true;
                                }

                                const now = new Date();
                                const today = new Date(
                                  now.getFullYear(),
                                  now.getMonth(),
                                  now.getDate()
                                );
                                if (
                                  date.getTime() === today.getTime() &&
                                  hour < now.getHours()
                                ) {
                                  return true;
                                }

                                return bookedAppointments.some((a) => {
                                  if (a.getHours() > 12) {
                                    return (
                                      hour === a.getHours() - 12 &&
                                      period === "PM"
                                    );
                                  } else {
                                    return (
                                      hour === a.getHours() && period === "AM"
                                    );
                                  }
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="doctorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <DoctorSelect
                            doctors={doctors}
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {formError && (
                  <div className="flex flex-col space-y-1. text-sm text-destructive text-center">
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    type="submit"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Book now
                  </Button>

                  <Button
                    className="w-full"
                    disabled={
                      !form.formState.isValid || form.formState.isSubmitting
                    }
                    asChild
                    type="button"
                    variant={"outline"}
                  >
                    <Link
                      href={AppRoute.Appointment.Base}
                      className="flex justify-center"
                    >
                      <ArrowLeftIcon className="w-5 h-5 mr-2" />
                      Back
                    </Link>
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Page;
