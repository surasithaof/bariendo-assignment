import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHomeButton from "@/components/shared/BackHomeButton";
import React from "react";

export default function NotFoundPage() {
  return (
    <ContentWrapper>
      <div className="grid grid-cols-1 gap-y-3 items-center justify-start border p-8 max-w-lg mx-auto rounded-md shadow-sm">
        <div className="flex justify-center my-4">
          <span className="text-xl text-red-500">
            Oops.., Unauthorized access
          </span>
        </div>
        <p className="text-gray-500">
          You are not authorized to access this page.
        </p>
        <BackHomeButton />
      </div>
    </ContentWrapper>
  );
}
