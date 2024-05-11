"use client";
import React, { useEffect } from "react";
import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHomeButton from "@/components/shared/BackHomeButton";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const defaultErrorMessage = "Something went wrong, please try again.";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ContentWrapper>
      <div className="grid grid-cols-1 gap-y-3 items-center justify-start border p-8 max-w-lg mx-auto rounded-md shadow-sm">
        <div className="flex justify-center my-4">
          <span className="text-xl text-red-500">
            Oops.., Something went wrong
          </span>
        </div>
        <p className="text-gray-500">{defaultErrorMessage}</p>
        <Button
          className="w-full"
          type="button"
          variant="default"
          onClick={reset}
        >
          <ReloadIcon className="mr-2 h-4 w-4" /> Try again
        </Button>
        <BackHomeButton />
      </div>
    </ContentWrapper>
  );
}
