"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useLanguage } from "@/components/app/language-provider";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const Pager = ({ onChange, quantity = 0, size = 5 }) => {
  const { translate } = useLanguage();
  const [selected, setSelected] = useState(1);

  const count = Math.ceil(quantity / size);
  const isAvaliable = count > 1;

  useEffect(() => {
    onChange?.(selected);
  }, [onChange, selected]);

  const next = () => {
    if (selected < count) {
      setSelected(selected + 1);
    }
  };

  const prev = () => {
    if (selected > 1) {
      setSelected(selected - 1);
    }
  };

  const handleChangeSelected = (nextSelected) => (event) => {
    event.preventDefault();

    setSelected(nextSelected);
  };

  const getSchema = () =>
    Array.from({ length: count }, (_, i) => i + 1)
      .map((v) => {
        if (
          v === 1 ||
          v === count ||
          v === selected ||
          v === selected - 1 ||
          v === selected + 1
        ) {
          return v;
        }

        return 0;
      })
      .filter((v, i, a) => i === 0 || v !== a[i - 1]);

  if (isAvaliable) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={prev}
              size="default"
              className="gap-1 pl-2.5"
            >
              <ChevronLeftIcon />
              {translate("prev")}
            </PaginationLink>
          </PaginationItem>
          {getSchema().map((value, idx) => (
            <PaginationItem key={idx}>
              {value > 0 && (
                <PaginationLink
                  isActive={selected === value}
                  onClick={handleChangeSelected(value)}
                >
                  {value}
                </PaginationLink>
              )}
              {value <= 0 && <PaginationEllipsis />}
            </PaginationItem>
          ))}
          <PaginationLink
            onClick={next}
            size="default"
            className="gap-1 pr-2.5"
          >
            {translate("next")}
            <ChevronRightIcon />
          </PaginationLink>
        </PaginationContent>
      </Pagination>
    );
  }

  return null;
};

export { Pager };
