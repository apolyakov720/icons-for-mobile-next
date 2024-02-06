"use client";

// import { Empty, EmptyTitle, EmptyDescription } from "@/components/app/empty";
import { useEffect, useTransition } from "react";
import { useAppState } from "@/components/app/state-provider";
import { Loader } from "@/components/ui/loader";

const Configs = ({ getConfigs }) => {
  const [isPending, startTransition] = useTransition();
  const { setValues } = useAppState();

  useEffect(() => {
    startTransition(() => {
      getConfigs().then(({ result, list }) => {
        if (result) {
          setValues({ configs: { list } });
        } else {
          toast.warning("Failed to download the configs from the server");
        }
      });
    });
  }, [setValues, getConfigs]);

  if (isPending) {
    return <Loader />;
  }

  return <div>Configs</div>;
};

export { Configs };
