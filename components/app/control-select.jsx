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

  const names = list.map(({ name }) => name);

  const onValueChange = (selected) => {
    setValues({ configs: { selected } });
  };

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-auto grow">
        <SelectValue placeholder="Select your configuration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {names.length === 0 && (
            <SelectLabel className="font-normal">
              The list of configurations is empty
            </SelectLabel>
          )}
          {names.map((name) => {
            return (
              <SelectItem key={name} value={name}>
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
