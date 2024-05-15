"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  GetAppointmentsPayload,
  getAppointmentsApi,
} from "@/lib/apis/appointmentApi";
import { parseDate, parseTime } from "@/lib/date-time";
import { Appointment } from "@/lib/types/appointments.type";
import { UserRole } from "@/lib/types/auth.enum";
import { CalendarIcon, ClockIcon, HomeIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Page() {
  const session = useSession();

  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [fetching, setFetching] = React.useState<boolean>(false);
  const [canBookNew, setCanBookNew] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      if (session.data?.user) {
        const userId = parseInt(session.data.user.id);

        const payload: GetAppointmentsPayload = {};
        if ((session.data?.user.role as string) === UserRole.SuperAdmin) {
          setCanBookNew(false);
        } else if (
          (session.data?.user.role as string).startsWith(UserRole.Admin)
        ) {
          const [role, orgId] = (session.data?.user.role as string).split(":");
          payload.orgId = parseInt(orgId);
          setCanBookNew(false);
        } else {
          payload.patientUserId = userId;
          setCanBookNew(true);
        }

        setFetching(true);
        const response = await getAppointmentsApi(payload).catch((error) => {
          console.error(error);
        });
        setFetching(false);
        if (response) {
          setAppointments(response.data);
        }
      } else {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [session.data]);

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between flex-col md:flex-row gap-2">
          <h1 className="text-xl font-semibold">Booked Appointments</h1>

          {canBookNew && (
            <Button asChild className="w-full md:w-fit">
              <Link href="/appointments/new" className="flex justify-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                Book new
              </Link>
            </Button>
          )}
        </div>

        {fetching && (
          <div className="flex flex-col gap-y-4">
            <Skeleton className="h-8 w-full rounded-xl" />
            <Skeleton className="h-8 w-full rounded-xl" />
            <Skeleton className="h-8 w-full rounded-xl" />
            <Skeleton className="h-8 w-full rounded-xl" />
            <Skeleton className="h-8 w-full rounded-xl" />
          </div>
        )}

        <div className="flex flex-col gap-y-4">
          {appointments.map((appointment: Appointment) => (
            <Button
              key={appointment.id}
              className="p-4 border rounded-md h-fit shadow-sm"
              variant="ghost"
              asChild
            >
              <Link
                href={`/appointments/${appointment.id}`}
                className="flex flex-row justify-between gap-y-2 w-full"
              >
                <div className="flex flex-col text-start gap-y-2">
                  <span className="font-semibold text-md">
                    {appointment.doctor?.userOrganization?.name}
                  </span>
                  <span className="flex flex-start">
                    <HomeIcon className="w-4 h-4 mr-2" />
                    {appointment.organization.name}
                  </span>
                </div>
                <div className="flex flex-col text-end gap-y-2">
                  <span className="flex flex-start">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {parseDate(appointment.date)}
                  </span>
                  <span className="flex flex-start">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {parseTime(appointment.date)}
                  </span>
                </div>
              </Link>
            </Button>
          ))}
        </div>

        {!fetching && appointments.length === 0 && (
          <div className="flex flex-col gap-y-4 my-4">
            <span className="text-md text-gray-500 text-center">
              No appointments found.
            </span>
          </div>
        )}
      </div>
    </ContentWrapper>
  );
}

export default Page;
