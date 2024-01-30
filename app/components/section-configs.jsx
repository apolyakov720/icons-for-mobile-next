import {
  // ExclamationTriangleIcon,
  DownloadIcon,
  PlusCircledIcon,
  CrossCircledIcon,
  Pencil2Icon,
  DotsHorizontalIcon,
  FileIcon,
} from "@radix-ui/react-icons";
// import { useLanguage } from "@/components/app/language-provider";
import {
  Section,
  SectionTitle,
  SectionDescription,
  SectionContent,
} from "@/components/app/section";
import { Separator } from "@/components/ui/separator";
// import { Empty, EmptyTitle, EmptyDescription } from "@/components/app/empty";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Controls, ControlsImportant } from "@/components/app/controls";

const data = [
  {
    name: "splash-land-hdpi",
    width: 800,
    height: 600,
    background: "Transparent",
    type: "Screen",
  },
  {
    name: "splash-land-ldpi",
    width: 900,
    height: 700,
    background: "Transparent",
    type: "Screen",
  },
  {
    name: "icon-land-ldpi",
    width: 100,
    height: 50,
    background: "Blue",
    type: "Icon",
  },
  {
    name: "icon-land-hdpi",
    width: 200,
    height: 150,
    background: "Yellow",
    type: "Icon",
  },
  {
    name: "icon-land-mdpi",
    width: 250,
    height: 200,
    background: "Green",
    type: "Icon",
  },
];

const SectionConfigs = () => {
  return (
    <Section>
      <SectionTitle>My configs</SectionTitle>
      <SectionDescription>
        Select one of the configuration rules for image generation
      </SectionDescription>
      <Separator className="mt-4" />
      <SectionContent className="flex flex-col space-y-4">
        <Controls>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <PlusCircledIcon className="mr-2" />
                Create configuration
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button variant="outline">
            <DownloadIcon className="mr-2" />
            Upload configuration
          </Button>
        </Controls>
        <Controls className="pt-3 border-t md:border-t-0 md:pt-0">
          <ControlsImportant>
            <Button variant="destructive">
              <CrossCircledIcon className="mr-2" />
              Удалить
            </Button>
            <Button variant="outline">
              <Pencil2Icon className="mr-2" />
              Переименовать
            </Button>
            <Button variant="outline">
              <FileIcon className="mr-2" />
              Сохранить
            </Button>
          </ControlsImportant>
          <Select>
            <SelectTrigger className="w-auto grow">
              <SelectValue placeholder="Select your configuration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ru">default.json</SelectItem>
              <SelectItem value="en">another.json</SelectItem>
            </SelectContent>
          </Select>
        </Controls>
        <Table className="border border-input">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Width</TableHead>
              <TableHead>Height</TableHead>
              <TableHead>Background</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <PlusCircledIcon className="mr-2" />
                      Добавить новое правило
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((value) => {
              return (
                <TableRow className="h-14" key={value.name}>
                  {Object.values(value).map((val, idx) => {
                    return <TableCell key={idx}>{val}</TableCell>;
                  })}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CrossCircledIcon className="mr-2" />
                          Удалить
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil2Icon className="mr-2" />
                          Редактировать
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Controls>
          <Button>Сгенерировать</Button>
        </Controls>
      </SectionContent>
    </Section>
  );
};

export { SectionConfigs };
