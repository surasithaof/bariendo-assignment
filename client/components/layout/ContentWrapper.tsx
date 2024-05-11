import React from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
type ContentWrapperProps = {
  children: React.ReactNode;
  footer?: boolean;
};
export default function ContentWrapper({
  children,
  footer = false,
}: Readonly<ContentWrapperProps>) {
  return (
    <div>
      <NavigationBar />
      <main className="p-6 md:p-16 md:py-8 lg:px-24 lg:py-8">{children}</main>
      {footer && <Footer />}
    </div>
  );
}
