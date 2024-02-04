import { cn } from "@/lib/utils";
import { UpdateIcon } from "@radix-ui/react-icons";

const Loader = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 justify-center items-center min-h-24 text-cyan-500",
        className
      )}
      {...props}
    >
      <UpdateIcon className="animate-spin h-[30px] w-[30px]" />
      {children}
    </div>
  );
};

export { Loader };
