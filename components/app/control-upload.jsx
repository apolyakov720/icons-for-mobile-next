"use client";

import { useTransition } from "react";
import { DownloadIcon, ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { uploadFile } from "@/actions/yandex";
import { useAppState } from "@/components/app/state-provider";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ControlUpload = ({ caption, onUpload, type = "images", ...props }) => {
  const [isPending, startTransition] = useTransition();
  const { values, setValues } = useAppState();

  const { list } = values[type] || {};

  const checkFileType = (fileType) => {
    if (type === "images") {
      return /image/.test(fileType);
    }

    return /json/.test(fileType);
  };

  const readFile = (file) => {
    const { name, type } = file;
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      if (checkFileType(type)) {
        reader.readAsDataURL(file);
      } else {
        reject({
          message: `The downloaded file "${name}" is not supported`,
        });
      }

      reader.onload = async (event) => {
        resolve({
          name,
          url: event.target.result,
        });
      };

      reader.onerror = () => {
        reject({
          message: `The file "${name}" cannot be read`,
        });
      };
    });
  };

  const handleChangeFiles = (event) => {
    startTransition(async () => {
      const files = Array.prototype.slice.call(event.target.files);

      // Параллельно читаем файлы
      const readFiles = await Promise.all(
        files.map((file) =>
          readFile(file)
            .then((response) => response)
            .catch(({ message }) => {
              toast.error(message);
            })
        )
      );

      // Параллельно загружаем файлы
      await Promise.all(
        readFiles.map(({ name, url }) =>
          uploadFile(url, name, type).then(({ result, toPath }) => {
            if (result) {
              return { name, path: toPath };
            } else {
              toast.error(
                `The file "${name}" could not be uploaded to the server`
              );
            }
          })
        )
      ).then((values) => {
        const updated = list.concat(values);

        setValues({ [type]: { list: updated } });
      });
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
