"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { ImageSchema } from "@/schemas";

const ImageSettings = () => {
  const form = useForm({
    resolver: zodResolver(ImageSchema),
    defaultValues: {
      width: "",
      height: "",
      percent: "",
      alpha: false,
      background: "",
      name: "",
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Ширина</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Введите ширину изображения" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Высота</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Введите высоту изображения" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="background"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Цвет фона</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Укажите цвет фона" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="percent"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Процент</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Введите процент" />
              </FormControl>
              <FormDescription>
                Какую часть изображения будет занимать логотип
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="alpha"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Установить альфа канал</FormLabel>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Имя выходного файла</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Укажите имя выходного файла" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <div className="flex justify-end">
        <Button>Добавить</Button>
      </div>
    </Form>
  );
};

export { ImageSettings };
