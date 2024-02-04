"use client";

// import { Empty, EmptyTitle, EmptyDescription } from "@/components/app/empty";
import { useEffect, useTransition } from "react";
import { useAppState } from "@/components/app/state-provider";
import { Loader } from "@/components/ui/loader";

const Configs = ({ getConfigs }) => {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      getConfigs().then((response) => console.log("resp: ", response));
    });
  }, [getConfigs]);

  if (isPending) {
    return <Loader />;
  }

  return <div>Configs</div>;
};

export { Configs };
