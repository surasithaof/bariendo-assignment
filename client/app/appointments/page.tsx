"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  const [appointments, setAppointments] = React.useState<any>([]);

  React.useEffect(() => {
    // TODO: fetch appointments from the server.
    setAppointments([
      {
        id: "1",
        date: "2021-10-01",
        time: "10:00",
        doctor: "Dr. Smith",
        org: "Org1",
      },
      {
        id: "2",
        date: "2021-10-02",
        time: "11:00",
        doctor: "Dr. Smith",
        org: "Org1",
      },
      {
        id: "3",
        date: "2021-10-03",
        time: "12:00",
        doctor: "Dr. Smith",
        org: "Org1",
      },
    ]);
  }, []);

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Booked Appointments</h1>

          <Button asChild>
            <Link href="/appointments/new" className="flex justify-center">
              <PlusIcon className="w-6 h-6 mr-2" />
              Book new
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-y-4">
          {appointments.map((appointment: any) => (
            <Button
              key={appointment.id}
              className="p-4 border rounded-md h-fit"
              variant="ghost"
              asChild
            >
              <Link
                href={`/appointments/${appointment.id}`}
                className="flex flex-row justify-between gap-y-2 w-full"
              >
                <div className="flex flex-col text-start">
                  <span className="font-semibold">{appointment.doctor}</span>
                  <span className="font-semibold">{appointment.org}</span>
                </div>
                <div className="flex flex-col text-end">
                  <span>{appointment.date}</span>
                  <span>{appointment.time}</span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Page;
