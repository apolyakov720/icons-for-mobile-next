import { cn } from "@/lib/utils";

const Controls = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap justify-end gap-2 md:flex-row",
        className
      )}
      {...props}
    />
  );
};

const ControlsImportant = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 md:flex-row md:mr-auto order-1 md:-order-1",
        className
      )}
      {...props}
    />
  );
};

export { Controls, ControlsImportant };
