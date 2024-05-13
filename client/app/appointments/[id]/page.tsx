"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { Button } from "@/components/ui/button";
import { AppRoute } from "@/lib/constants";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

function Page() {
  const [appointment, setAppointment] = React.useState<any>();

  React.useEffect(() => {
    // TODO: fetch appointments from the server.
    setAppointment({
      id: "1",
      date: "2021-10-01",
      time: "10:00",
      doctor: "Dr. Smith",
      org: "Org1",
    });
  }, []);

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Booked Appointments</h1>
        </div>

        <div className="flex flex-col gap-y-4">
          {appointment && (
            <div className="flex flex-col  gap-y-2 w-full">
              <span className="font-semibold">
                Doctor: {appointment.doctor}
              </span>
              <span className="font-semibold">
                Organization: {appointment.org}
              </span>
              <span>Date: {appointment.date}</span>
              <span>Time: {appointment.time}</span>
            </div>
          )}
        </div>

        <Button className="w-full" asChild>
          <Link
            href={AppRoute.Appointment.Base}
            className="flex justify-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </Link>
        </Button>
      </div>
    </ContentWrapper>
  );
}

export default Page;
