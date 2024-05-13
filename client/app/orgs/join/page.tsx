"use client";
import ContentWrapper from "@/components/layout/ContentWrapper";
import { OrgsSelect } from "@/components/pages/appointments/OrgsSelect";
import { RoleSelect } from "@/components/pages/appointments/RoleSelect";
import { Button } from "@/components/ui/button";
import { getOrgsApi } from "@/lib/apis/orgsApi";
import { createUserOrgsApi, getUserOrgsApi } from "@/lib/apis/userApi";
import { AppRoute } from "@/lib/constants";
import { UserRole } from "@/lib/types/auth.enum";
import { Organization } from "@/lib/types/org.type";
import { UserOrganization } from "@/lib/types/user.type";
import { HomeIcon } from "@radix-ui/react-icons";
import { ArrowLeftIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const session = useSession();
  const router = useRouter();

  const [fetching, setFetching] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const [orgs, setOrgs] = React.useState<Organization[]>([]);
  const [selectedOrg, setSelectedOrg] = React.useState<
    Organization | undefined
  >(undefined);

  const handleSelectOrg = (orgId: string) => {
    const org = orgs.find((org) => org.id.toString() === orgId);
    setSelectedOrg(org);
  };

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

  const [selectedRole, setSelectedRole] = React.useState<
    UserRole | undefined
  >();
  const handleSelectRole = (role: string) => {
    setSelectedRole(role as UserRole);
  };

  const handleJoin = async () => {
    const userId = session.data?.user.id;
    if (userId && selectedOrg && !!selectedRole) {
      setSubmitting(true);
      await createUserOrgsApi(parseInt(userId), selectedOrg.id, selectedRole);
      setSubmitting(false);
      router.push(AppRoute.Appointment.New);
    }
  };

  return (
    <ContentWrapper>
      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Join organization</h1>
        </div>

        <OrgsSelect
          orgs={orgs}
          selectedOrg={selectedOrg}
          onValueChange={handleSelectOrg}
          disabledSelect={(org) =>
            !!userOrgs.find((userOrg) => userOrg.organizationId === org.id)
          }
        />
        <RoleSelect
          selectedRole={selectedRole}
          onValueChange={handleSelectRole}
        />
        <Button
          className="w-full"
          onClick={handleJoin}
          disabled={!selectedOrg || !selectedRole || submitting || fetching}
        >
          <HomeIcon className="w-5 h-5 mr-2" />
          Join
        </Button>
        <Button
          className="w-full"
          disabled={!selectedOrg || !selectedRole || submitting || fetching}
          asChild
          variant={"outline"}
        >
          <Link href={AppRoute.Appointment.New} className="flex justify-center">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back
          </Link>
        </Button>
      </div>
    </ContentWrapper>
  );
}

export default Page;
