"use client";

import { useState, useEffect, useTransition } from "react";
import { ExclamationTriangleIcon, ImageIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { Pager } from "@/components/app/pager";
import { useAppState } from "@/components/app/state-provider";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";
import { Glimpse, GlimpseCaption } from "@/components/ui/glimpse";
import { Label } from "@/components/ui/label";
import { Loader } from "@/components/ui/loader";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Images = ({ getImages, pageSize = 5 }) => {
  const [isPending, startTransition] = useTransition();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    values: {
      images: { list },
    },
    setValues,
  } = useAppState();

  useEffect(() => {
    startTransition(() => {
      getImages().then(({ result, list }) => {
        if (result) {
          setValues({ images: { list } });
        } else {
          toast.warning("Failed to download the images from the server");
        }
      });
    });
  }, [setValues, getImages]);

  const onValueChange = (selected) => {
    setValues({ images: { selected } });
  };

  if (isPending) {
    return <Loader />;
  }

  if (list.length > 0) {
    const visibleImages = list.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );

    return (
      <div className="space-y-4">
        <RadioGroup
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4"
          onValueChange={onValueChange}
        >
          {visibleImages.map(({ name, path }) => {
            return (
              <Label
                key={name}
                className="[&:has([data-state=checked])>div]:border-green-500"
              >
                <RadioGroupItem value={path} className="peer sr-only" />
                <Glimpse className="min-h-24">
                  <ImageIcon />
                </Glimpse>
                <GlimpseCaption>{name}</GlimpseCaption>
              </Label>
            );
          })}
        </RadioGroup>
        <Pager
          quantity={list.length}
          size={pageSize}
          selected={currentPage}
          onChange={setCurrentPage}
        />
      </div>
    );
  }

  return (
    <Empty>
      <ExclamationTriangleIcon className="text-destructive" />
      <EmptyTitle>The list of images is empty</EmptyTitle>
      <EmptyDescription>
        To continue working, download the images
      </EmptyDescription>
    </Empty>
  );
};

export { Images };
