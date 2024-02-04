"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select";
import { useAppState } from "@/components/app/state-provider";

const ControlSelect = () => {
  const {
    values: {
      configs: { list },
    },
    setValues,
  } = useAppState();

  return (
    <Select>
      <SelectTrigger className="w-auto grow">
        <SelectValue placeholder="Select your configuration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.length === 0 && (
            <SelectLabel className="font-normal">
              The list of configurations is empty
            </SelectLabel>
          )}
          {list.map(({ name, path }) => {
            return (
              <SelectItem key={path} value={path}>
                {name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { ControlSelect };
