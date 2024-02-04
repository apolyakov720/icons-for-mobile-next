import * as zod from "zod";

const ImageSchema = zod.object({
  width: zod.number(),
  height: zod.number(),
  percent: zod
    .number()
    .min(1, "Минимальное значение - 1")
    .max(100, "Максимально значение - 100"),
  alpha: zod.boolean(),
  background: zod.string(),
  name: zod.string(),
});

const SettingsSchema = zod.object({
  lang: zod.string(),
  theme: zod.string(),
});

const FileSchema = zod.object({
  name: zod
    .string()
    .min(1, "Имя файла должно состоять как минимум из 1-го символа")
    .max(50, "Имя файла должно состоять максимум из 50-ти символов"),
});

export { ImageSchema, SettingsSchema, FileSchema };
