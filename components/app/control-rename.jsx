"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil2Icon, ReloadIcon } from "@radix-ui/react-icons";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileSchema } from "@/schemas";

const ControlRename = ({ onRename, type = "images" }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { values, setValues } = useAppState();
  const form = useForm({
    resolver: zodResolver(FileSchema),
    defaultValues: {
      name: "",
    },
  });

  const { selected, list } = values[type] || {};

  useEffect(() => {
    if (selected) {
      const fileFull = selected?.split("/").pop();
      const fileName = fileFull?.substr(0, fileFull?.lastIndexOf("."));

      form.reset({
        name: fileName,
      });
    }
  }, [form, selected, isOpen]);

  const onSubmit = (values) => {
    if (selected) {
      startTransition(() => {
        onRename(selected, values).then(({ result, toName, toPath }) => {
          if (result) {
            const updated = list.map((item) => {
              if (item.path === selected) {
                return {
                  ...item,
                  path: toPath,
                  name: toName,
                };
              }

              return item;
            });

            setIsOpen(false);
            setValues({ [type]: { selected: null, list: updated } });
          } else {
            toast.warning("The file could not be renamed");
          }
        });
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" disabled={!selected}>
          <Pencil2Icon className="mr-2" />
          Rename
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Renaming a file</AlertDialogTitle>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter the file name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                disabled={isPending || !form.formState.isDirty}
                type="submit"
              >
                {isPending && <ReloadIcon className="mr-2 animate-spin" />}
                Сontinue
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { ControlRename };
