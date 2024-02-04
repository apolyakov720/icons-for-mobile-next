import {
  getImages,
  removeFile,
  renameFile,
  uploadFile,
} from "@/actions/yandex";
import { ControlRemove } from "@/components/app/control-remove";
import { ControlRename } from "@/components/app/control-rename";
import { ControlUpload } from "@/components/app/control-upload";
import { Images } from "@/components/app/images";
import { Controls, ControlsImportant } from "@/components/ui/controls";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";

const SectionImages = () => {
  return (
    <Section>
      <SectionTitle>My images</SectionTitle>
      <SectionDescription>
        Select an image from the list to generate resources
      </SectionDescription>
      <Separator className="mt-4" />
      <SectionContent>
        <Controls>
          <ControlsImportant>
            <ControlRemove onRemove={removeFile} />
            <ControlRename onRename={renameFile} />
          </ControlsImportant>
          <ControlUpload
            caption="Upload images"
            onUpload={uploadFile}
            accept="image/*"
          />
        </Controls>
        <Images getImages={getImages} />
      </SectionContent>
    </Section>
  );
};

export { SectionImages };
