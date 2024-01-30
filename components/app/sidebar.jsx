"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Sidebar = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col gap-1 md:flex-row md:justify-between lg:flex-col lg:justify-start",
      className
    )}
    {...props}
  />
);

const SidebarItem = ({ className, to, ...props }) => {
  const pathname = usePathname();

  return (
    <Link href={to}>
      <Button
        variant={pathname === to ? "secondary" : "ghost"}
        className={cn("w-full justify-start", className)}
        {...props}
      />
    </Link>
  );
};

export { Sidebar, SidebarItem };
