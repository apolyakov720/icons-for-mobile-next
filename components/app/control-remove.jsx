"use client";

import { useState, useTransition } from "react";
import { CrossCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useAppState } from "@/components/app/state-provider";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const ControlRemove = ({ type = "images", onRemove }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { values, setValues } = useAppState();

  const { selected, list } = values[type] || {};
  const fileName = selected?.split("/").pop();

  const onClickRemoveHandler = () => {
    if (selected) {
      startTransition(() => {
        onRemove(selected).then(({ result }) => {
          if (result) {
            const updated = list.filter(({ path }) => path !== selected);

            setIsOpen(false);
            setValues({ [type]: { selected: null, list: updated } });
          } else {
            toast.warning("The file could not be deleted");
          }
        });
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" disabled={!selected}>
          <CrossCircledIcon className="mr-2" />
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Do you really want to delete the &quot;{fileName}&quot;?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button disabled={isPending} onClick={onClickRemoveHandler}>
            {isPending && <ReloadIcon className="mr-2 animate-spin" />}
            Сontinue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ControlRemove };
