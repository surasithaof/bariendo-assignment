import AppIcon from "@/components/shared/AppIcon";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-b from-slate-200 to-white dark:from-slate-800 dark:to-background">
      <div className="mx-auto w-full max-w-screen-xl p-6 md:py-8 px-6 md:px-16 lg:px-24">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-y-2">
            <Link href="/">
              <AppIcon />
            </Link>
          </div>

          <div className="flex flex-col gap-y-2">
            <h2 className="text-md font-bold text-muted-foreground">Legal</h2>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>

        <hr className="my-4 text-muted-foreground sm:mx-auto" />
        <span className="block text-sm text-muted-foreground sm:text-center">
          Copyright © 2024 - All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
