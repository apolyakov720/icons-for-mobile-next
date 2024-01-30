"use client";

import { cn } from "@/lib/utils";

const Section = ({ className, ...props }) => (
  <div className={cn("flex flex-col", className)} {...props} />
);

const SectionTitle = ({ className, ...props }) => (
  <div
    className={cn("text-2xl font-bold tracking-tight", className)}
    {...props}
  />
);

const SectionDescription = ({ className, ...props }) => (
  <div
    className={cn("text-muted-foreground text-cyan-500", className)}
    {...props}
  />
);

const SectionContent = ({ className, ...props }) => (
  <div className={cn("mt-4", className)} {...props} />
);

export { Section, SectionTitle, SectionDescription, SectionContent };
