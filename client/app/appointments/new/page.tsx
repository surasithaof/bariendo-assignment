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
import { PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { HomeIcon } from "@radix-ui/react-icons";

function Page() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [hour, setHour] = React.useState<number | undefined>(1);
  const [period, setPeriod] = React.useState<string | undefined>("AM");

  const session = useSession();

  const [userOrgs, setUserOrgs] = React.useState<UserOrganization[]>([]);
  const [selectedUserOrg, setSelectedUserOrg] = React.useState<
    UserOrganization | undefined
  >(undefined);

  React.useEffect(() => {
    const fetchOrgs = async () => {
      if (session.data?.user.id) {
        const userId = session.data?.user.id;
        const { data: userOrgs } = await getUserOrgsApi(parseInt(userId));
        setUserOrgs(userOrgs);
      }
    };
    fetchOrgs();
  }, [session.data]);

  const handleSelectUserOrg = (orgId: string) => {
    const org = userOrgs.find((org) => org.id.toString() === orgId);
    setSelectedUserOrg(org);
    // TODO: fetch available dates and times for the selected organization.
  };

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Booking Appointments</h1>
        </div>
        <div className="flex flex-col gap-y-2 md:w-fit mx-auto">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <div className="basis-2/3">
                <UserOrgsSelect
                  orgs={userOrgs}
                  selectedOrg={selectedUserOrg}
                  onValueChange={handleSelectUserOrg}
                />
              </div>
              <div className="basis-1/3">
                <Button className="w-full" asChild>
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
          </div>
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
            </div>

            <div className="flex flex-row gap-2 w-full">
              <div className="basis-1/2">
                <Select
                  value={hour?.toString()}
                  onValueChange={(value) => setHour(parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Time</SelectLabel>
                      {[0, ...Array(11)].map((_, i) => (
                        <SelectItem
                          key={`h-${i + 1}`}
                          value={(i + 1).toString()}
                          className="text-center"
                        >
                          {(i + 1).toString().padStart(2, "0")}:00
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="basis-1/2">
                <Select
                  value={period}
                  onValueChange={(value) => setPeriod(value)}
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
              </div>
            </div>

            <Button className="w-full" asChild>
              <Link href="/appointments/new" className="flex justify-center">
                <PlusIcon className="w-5 h-5 mr-2" />
                Book now {`${date?.toLocaleDateString()} ${hour}:00`}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Page;
