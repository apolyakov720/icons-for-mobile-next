import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { DownloadIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useLanguage } from "@/components/app/language-provider";
import { ListImages } from "@/app/components/list-images";
import {
  Section,
  SectionTitle,
  SectionDescription,
  SectionContent,
} from "@/components/app/section";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { readImageFile } from "@/lib/file";

const getListImages = async () => {
  return await fetch("/api/image/list");
};

const SectionIcons = () => {
  const { translate } = useLanguage();
  const [listImages, setListImages] = useState([]);

  const saveImagesToList = (images) => {
    setListImages((list) => [...list, ...images]);
  };

  useEffect(() => {
    const fetchListImages = async () => {
      const { list } = await getListImages();

      setListImages(list);
    };

    fetchListImages();
  }, []);

  const handleChangeFiles = async (event) => {
    const files = event.target.files;

    const listImages = [];

    if (files?.length) {
      for (const file of files) {
        try {
          // Если файл с таким именим существует не делать запрос
          const { result, message } = await readImageFile(file);

          if (result) {
            listImages.push(result);
            toast.success(message);
          } else {
            toast.warning(message);
          }
        } catch (error) {
          const { message, description } = error;
          toast.error(message, { description });
        }
      }

      saveImagesToList(listImages);
    }
  };

  const handleChangeImage = (image) => {
    console.log("value: ", image);
  };

  return (
    <Section>
      <SectionTitle>{translate("myIcons")}</SectionTitle>
      <SectionDescription>{translate("myIconsDescription")}</SectionDescription>
      <Separator className="mt-4" />
      <SectionContent>
        <div className="flex justify-end">
          <Button variant="destructive" className="mr-auto" disabled>
            <CrossCircledIcon className="mr-2" />
            {translate("remove")}
          </Button>
          <input
            id="image-provider"
            name="image-provider"
            type="file"
            multiple
            accept="image/*"
            className="absolute opacity-0 invisible pointer-events-none -top-[1000px] -left-[1000px]"
            onChange={handleChangeFiles}
          />
          <Button variant="outline" asChild>
            <Label htmlFor="image-provider">
              <DownloadIcon className="mr-2" />
              {translate("uploadImages")}
            </Label>
          </Button>
        </div>
        <Suspense fallback={<p>Hello</p>}>
          <ListImages list={listImages} onChangeItem={handleChangeImage} />
        </Suspense>
      </SectionContent>
    </Section>
  );
};

export { SectionIcons };
