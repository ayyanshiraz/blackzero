import React from "react";
import RelatedProjects from "@/components/RelatedProjects";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <RelatedProjects />
    </>
  );
}