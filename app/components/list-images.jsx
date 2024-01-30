"use client";

import { useState } from "react";
// import Image from "next/image";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Glimpse, GlimpseCaption } from "@/components/app/glimpse";
import { Pager } from "@/app/components/pager";
import { Empty, EmptyTitle, EmptyDescription } from "@/components/app/empty";
import { useLanguage } from "@/components/app/language-provider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ListImages = ({ list = [], onChangeItem }) => {
  const PAGE_SIZE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { translate } = useLanguage();

  if (list.length > 0) {
    const listVisible = list.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );

    return (
      <div className="space-y-4">
        <RadioGroup
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4"
          onValueChange={onChangeItem}
        >
          {listVisible.map((name) => {
            return (
              <Label
                key={name}
                className="[&:has([data-state=checked])>div]:border-green-500"
              >
                <RadioGroupItem value={name} className="peer sr-only" />
                <Glimpse className="min-h-24">{name}</Glimpse>
                <GlimpseCaption>{name}</GlimpseCaption>
              </Label>
            );
          })}
        </RadioGroup>
        <Pager
          quantity={list.length}
          onChange={setCurrentPage}
          size={PAGE_SIZE}
        />
      </div>
    );
  }

  return (
    <Empty>
      <ExclamationTriangleIcon className="text-destructive" />
      <EmptyTitle>{translate("emptyImagesList")}</EmptyTitle>
      <EmptyDescription>
        {translate("emptyImagesListDescription")}
      </EmptyDescription>
    </Empty>
  );
};

export { ListImages };
