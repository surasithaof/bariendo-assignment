"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [hour, setHour] = React.useState<number | undefined>();

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Booking Appointments</h1>
        </div>

        {/* TODO:  update the calendar to show available dates and times.*/}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
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
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[0, ...Array(23)].map((_, i) => (
                <Button
                  key={i}
                  className="p-4 border rounded-md h-fit w-full"
                  variant="ghost"
                  asChild
                  onClick={() => {
                    setHour(i);
                  }}
                >
                  <span>{i.toString().padStart(2, "0")}:00</span>
                </Button>
              ))}
            </div>
          </div>

          <Button className="w-full">
            <Link href="/appointments/new" className="flex justify-center">
              <PlusIcon className="w-6 h-6 mr-2" />
              Book now {`${date?.toLocaleDateString()} ${hour}:00`}
            </Link>
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Page;
