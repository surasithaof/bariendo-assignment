import { Button } from "@/components/ui/button";
import { AppRoute } from "@/lib/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="w-full px-6 md:px-16 lg:px-24 pt-32 pb-72 bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-900">
      <div className="flex flex-col gap-y-4 md:text-center animate-fade">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline ">
            Welcome to{" "}
            <span className="inline bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text">
              Bariendo
            </span>
          </h1>{" "}
        </main>

        <p className="text-md md:text-xl text-muted-foreground">
          {`Bariendo assignment project. It is a simple web application
          to create a doctor's appointment.`}
        </p>

        <div className="flex justify-center flex-col md:flex-row gap-2">
          <Button asChild className="w-full px-20 md:w-fit">
            <Link href={AppRoute.Home}>Get started</Link>
          </Button>
          <Button asChild className="w-full px-20 md:w-fit" variant="outline">
            <Link
              href={"https://github.com/surasithaof/bariendo-assignment.git"}
              target="_blank"
            >
              <GitHubLogoIcon className="w-5 h-5 mr-2" />
              GitHub
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
