"use client";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import AppIcon from "../shared/AppIcon";
import { signIn, signOut, useSession } from "next-auth/react";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { AppRoute } from "@/lib/constants";
import { REFRESH_TOKEN_ERROR } from "@/lib/types/auth.type";

export default function NavigationBar() {
  const session = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn();
  };

  const handleSignOut = async () => {
    signOut().then(() => window.location.replace("/"));
  };

  React.useEffect(() => {
    if (session?.data?.error === REFRESH_TOKEN_ERROR) {
      signOut().then(() => {
        sessionStorage.clear();
      });
      router.push(AppRoute.Auth.SignIn);
    }
  }, [session?.data, router]);

  return (
    <div className="sticky top-0 z-40 ">
      {/* nav */}
      <nav className="transform w-full border-b backdrop-blur backdrop-filter bg bg-opacity-75 shadow-sm">
        <div className="p-4 px-6 md:px-16 lg:px-24 flex justify-between items-center">
          <Link href="/">
            <AppIcon />
          </Link>
          <div className="flex justify-center gap-x-2">
            <div>
              <ModeToggle />
            </div>
            {session.status != "authenticated" && (
              <Button onClick={handleSignIn} variant="outline" className="px-3">
                <EnterIcon className="h-[1.2rem] w-[1.2rem] mr-2" />
                Sign In
              </Button>
            )}
            {session.status == "authenticated" && (
              <Button onClick={handleSignOut} variant="outline" size="icon">
                <ExitIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
