import { cn } from "@/lib/utils";

const Empty = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col p-5 items-center space-y-1 text-center",
      className
    )}
    {...props}
  />
);

const EmptyTitle = ({ className, ...props }) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props} />
);

const EmptyDescription = ({ className, ...props }) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export { Empty, EmptyTitle, EmptyDescription };
