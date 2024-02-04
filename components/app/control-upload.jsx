"use client";

import { useTransition } from "react";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useAppState } from "@/components/app/state-provider";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ControlUpload = ({ caption, onUpload, type = "images", ...props }) => {
  const [isPending, startTransition] = useTransition();
  const { values, setValues } = useAppState();

  const { list } = values[type] || {};

  const checkFileSupport = (fileType) => {
    if (type === "images") {
      return /image/.test(fileType);
    }

    return /json/.test(fileType);
  };

  const readFile = (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      if (checkFileSupport(file.type)) {
        reader.readAsDataURL(file);
      } else {
        resolve({
          result: false,
          message: `The downloaded file "${file.name}" is not supported`,
        });
      }

      reader.onload = async (event) => {
        resolve({
          result: true,
          target: event.target.result,
        });
      };

      reader.onerror = () => {
        reject({
          result: false,
          message: `The file "${file.name}" cannot be read`,
        });
      };
    });
  };

  const handleChangeFiles = (event) => {
    startTransition(async () => {
      const files = event.target.files;

      if (files?.length) {
        for (const file of files) {
          try {
            const { result, target, message } = await readFile(file);

            if (result) {
              onUpload(target, file.name, type).then((response) => {
                if (response.result) {
                  const updated = list.concat({
                    name: file.name,
                    path: response.toPath,
                  });

                  setValues({ [type]: { list: updated } });
                } else {
                  toast.warning(
                    `The file "${file.name}" could not be uploaded to the server`
                  );
                }
              });
            } else {
              toast.warning(message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        }
      }
    });
  };

  return (
    <>
      <input
        id={type}
        name={type}
        type="file"
        multiple
        className="absolute opacity-0 invisible pointer-events-none -top-[1000px] -left-[1000px]"
        onChange={handleChangeFiles}
        {...props}
      />
      <Label
        htmlFor={type}
        className={cn(
          buttonVariants({ variant: "outline" }),
          isPending && "pointer-events-none opacity-50"
        )}
      >
        {!isPending && <DownloadIcon className="mr-2" />}
        {isPending && <ReloadIcon className="mr-2 animate-spin" />}
        {caption}
      </Label>
    </>
  );
};

export { ControlUpload };
