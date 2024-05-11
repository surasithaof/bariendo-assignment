import ContentWrapper from "@/components/layout/ContentWrapper";
import BackHomeButton from "@/components/shared/BackHomeButton";
import React from "react";

export default function NotFoundPage() {
  return (
    <ContentWrapper>
      <div className="grid grid-cols-1 gap-y-3 items-center justify-start border p-8 max-w-lg mx-auto rounded-md shadow-sm">
        <div className="flex justify-center my-4">
          <span className="text-xl text-red-500">Oops.., Page not found</span>
        </div>
        <p className="text-gray-500">
          The page you are looking for might have been removed or the URL is
          incorrect.
        </p>
        <BackHomeButton />
      </div>
    </ContentWrapper>
  );
}
