"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { useLanguage } from "@/components/app/language-provider";
import { Glimpse, GlimpseCaption } from "@/components/ui/glimpse";
import {
  Section,
  SectionTitle,
  SectionDescription,
  SectionContent,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "@/schemas";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, translate } = useLanguage();
  const form = useForm({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      lang: language,
      theme,
    },
  });

  const {
    reset,
    formState: { isDirty, isValid },
  } = form;

  const handleSubmitForm = (values) => {
    setTheme(values.theme);
    setLanguage(values.lang);
    reset(values);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(handleSubmitForm)}
      >
        <Section>
          <SectionTitle>{translate("appearance")}</SectionTitle>
          <SectionDescription>
            {translate("appearanceDescription")}
          </SectionDescription>
          <Separator className="mt-4" />
          <SectionContent>
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>{translate("theme")}</FormLabel>
                  <FormDescription>{translate("chooseTheme")}</FormDescription>
                  <FormMessage />
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid max-w-md grid-cols-2 gap-8 pt-2"
                  >
                    <FormItem className="space-y-4">
                      <FormLabel className="[&:has([data-state=checked])>div]:border-green-500">
                        <FormControl>
                          <RadioGroupItem value="light" className="sr-only" />
                        </FormControl>
                        <Glimpse className="bg-[#ecedef]" />
                        <GlimpseCaption>
                          {translate("themeLight")}
                        </GlimpseCaption>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="[&:has([data-state=checked])>div]:border-green-500">
                        <FormControl>
                          <RadioGroupItem value="dark" className="sr-only" />
                        </FormControl>
                        <Glimpse className="bg-slate-500" />
                        <GlimpseCaption>
                          {translate("themeDark")}
                        </GlimpseCaption>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormItem>
              )}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>{translate("language")}</SectionTitle>
          <SectionDescription>
            {translate("languageDescription")}
          </SectionDescription>
          <Separator className="mt-4" />
          <SectionContent>
            <FormField
              control={form.control}
              name="lang"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={translate("chooseLanguage")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ru">
                        {translate("languageNameRu")}
                      </SelectItem>
                      <SelectItem value="en">
                        {translate("languageNameEn")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SectionContent>
        </Section>
        <Button disabled={!isDirty || !isValid} type="submit" variant="outline">
          <CheckCircledIcon className="mr-2" />
          {translate("updatePreferences")}
        </Button>
      </form>
    </Form>
  );
};

export default SettingsPage;
