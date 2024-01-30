// import { useState } from "react";
import { GearIcon, LaptopIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Sidebar, SidebarItem } from "@/components/app/sidebar";

const Wrapper = async ({ children }) => {
  return (
    <main className="container flex flex-col bg-background py-2 space-y-4 max-w-screen-xl">
      <section className="relative overflow-hidden rounded-[0.5rem] border bg-background shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          <Sidebar className="col-span-1 p-3">
            <SidebarItem to="/">
              <LaptopIcon className="mr-2 flex-shrink-0" />
              Workbench
            </SidebarItem>
            <SidebarItem to="/settings">
              <GearIcon className="mr-2 flex-shrink-0" />
              Settings
            </SidebarItem>
            <SidebarItem to="/instructions">
              <ReaderIcon className="mr-2 flex-shrink-0" />
              Instructions
            </SidebarItem>
          </Sidebar>
          <div className="row-start-2 border-t lg:row-start-1 lg:col-span-4 lg:col-start-2 lg:border-l lg:border-t-0">
            <div className="h-full pt-3 pb-5 px-4">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { Wrapper };
