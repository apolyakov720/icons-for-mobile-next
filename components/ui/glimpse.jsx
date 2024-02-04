import { cn } from "@/lib/utils";

const Glimpse = ({ className, caption, ...props }) => (
  <div className="p-1 rounded-md w-full border-2 border-input hover:border-muted-foreground/80">
    <div
      className={cn(
        "relative flex items-center justify-center rounded-md min-h-20 overflow-hidden",
        className
      )}
      {...props}
    />
  </div>
);

const GlimpseCaption = ({ className, ...props }) => (
  <div
    className={cn("flex justify-center p-2 text-center font-normal", className)}
    {...props}
  />
);

export { Glimpse, GlimpseCaption };
