import { FileIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const ControlSave = () => {
  return (
    <Button variant="outline">
      <FileIcon className="mr-2" />
      Save
    </Button>
  );
};

export { ControlSave };
