"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAppointmentByIdApi } from "@/lib/apis/appointmentApi";
import { AppRoute } from "@/lib/constants";
import { parseDate, parseTime } from "@/lib/date-time";
import { Appointment } from "@/lib/types/appointments.type";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function Page({ params }: { params: { id: string } }) {
  const [appointment, setAppointment] = React.useState<Appointment>();

  React.useEffect(() => {
    const fetchAppointment = async () => {
      if (!params.id) return;
      const resp = await getAppointmentByIdApi(parseInt(params.id));
      setAppointment(resp.data);
    };
    fetchAppointment();
  }, [params.id]);

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <span className="font-semibold text-xl">
          Booked Appointment Details
        </span>

        <div className="flex flex-col gap-4 py-4 w-full mx-auto rounded-md border p-4 shadow-sm">
          {!appointment && (
            <div className="flex flex-col gap-y-4 w-full">
              <Skeleton className="h-6 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded-xl" />
            </div>
          )}
          {appointment && (
            <div className="flex flex-col gap-y-4 w-full">
              <span className="flex flex-start text-md">
                <span className="flex flex-start font-semibold mr-2">
                  <PersonIcon className="w-6 h-6 mr-2" />
                  Doctor:
                </span>
                {appointment.doctor?.userOrganization?.name}
              </span>
              <span className="flex flex-start text-md">
                <span className="flex flex-start font-semibold mr-2">
                  <HomeIcon className="w-6 h-6 mr-2" />
                  Organization:
                </span>{" "}
                {appointment.organization.name}
              </span>
              <span className="flex flex-start text-md">
                <span className="flex flex-start font-semibold mr-2">
                  <CalendarIcon className="w-6 h-6 mr-2" />
                  Date:
                </span>{" "}
                {parseDate(appointment.date)}
              </span>
              <span className="flex flex-start text-md">
                <span className="flex flex-start font-semibold mr-2">
                  <ClockIcon className="w-6 h-6 mr-2" />
                  Time:
                </span>{" "}
                {parseTime(appointment.date)}
              </span>
            </div>
          )}
        </div>

        <Button className="w-full" asChild variant="outline">
          <Link
            href={AppRoute.Appointment.Base}
            className="flex justify-center"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            Back
          </Link>
        </Button>
      </div>
    </ContentWrapper>
  );
}

export default Page;
