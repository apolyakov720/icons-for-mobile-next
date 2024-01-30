import {
  DownloadIcon,
  CrossCircledIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { ListImages } from "@/app/components/list-images";
import {
  Section,
  SectionTitle,
  SectionDescription,
  SectionContent,
} from "@/components/app/section";
import { Controls, ControlsImportant } from "@/components/app/controls";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const SectionIcons = () => {
  return (
    <Section>
      <SectionTitle>My icons</SectionTitle>
      <SectionDescription>
        Select an icon from the list to generate images
      </SectionDescription>
      <Separator className="mt-4" />
      <SectionContent>
        <Controls>
          <ControlsImportant>
            <Button variant="destructive">
              <CrossCircledIcon className="mr-2" />
              Удалить
            </Button>
            <Button variant="outline">
              <Pencil2Icon className="mr-2" />
              Переименовать
            </Button>
          </ControlsImportant>
          <Button variant="outline">
            <DownloadIcon className="mr-2" />
            Загрузить иконки
          </Button>
        </Controls>
        <ListImages
          list={[
            "HelloworldsometextlongverylongHello-worldsometextlong-very-long.svg",
            2,
            3,
            4,
            5,
            6,
          ]}
        />
      </SectionContent>
    </Section>
  );
};

export { SectionIcons };
