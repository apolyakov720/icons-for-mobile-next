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

export { ImageSchema, SettingsSchema };
