import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function BackHomeButton() {
  return (
    <Button asChild className="w-full" type="button">
      <Link href={"/"}>
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to homepage
      </Link>
    </Button>
  );
}
