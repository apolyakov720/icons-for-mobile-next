import { getConfigs } from "@/actions/yandex";
import { Configs } from "@/components/app/configs";
import { ControlCreate } from "@/components/app/control-create";
import { ControlGenerate } from "@/components/app/control-generate";
import { ControlRemove } from "@/components/app/control-remove";
import { ControlRename } from "@/components/app/control-rename";
import { ControlSave } from "@/components/app/control-save";
import { ControlSelect } from "@/components/app/control-select";
import { ControlUpload } from "@/components/app/control-upload";
import { Controls, ControlsImportant } from "@/components/ui/controls";
import {
  Section,
  SectionContent,
  SectionDescription,
  SectionTitle,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";

const SectionConfigs = () => {
  return (
    <Section>
      <SectionTitle>My configs</SectionTitle>
      <SectionDescription>
        Select one of the configuration rules for resources generation
      </SectionDescription>
      <Separator className="mt-4" />
      <SectionContent className="flex flex-col space-y-4">
        <Controls>
          <ControlCreate />
          <ControlUpload
            caption="Upload configurations"
            type="configs"
            accept="application/json"
          />
        </Controls>
        <Controls className="pt-3 border-t md:border-t-0 md:pt-0">
          <ControlsImportant>
            <ControlRemove type="configs" />
            <ControlRename type="configs" />
            <ControlSave />
          </ControlsImportant>
          <ControlSelect />
        </Controls>
        <Configs getConfigs={getConfigs} />
        <Controls>
          <ControlGenerate />
        </Controls>
      </SectionContent>
    </Section>
  );
};

export { SectionConfigs };
