"use client";
import { ModeToggle } from "@/components/shared/ModeToggle";
import { Button } from "@/components/ui/button";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import AppIcon from "../shared/AppIcon";

export default function NavigationBar() {
  const [open, setOpen] = React.useState(false);
  const handleOpenSideNav = () => {
    setOpen(!open);
  };

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
          </div>
        </div>
      </nav>
    </div>
  );
}
