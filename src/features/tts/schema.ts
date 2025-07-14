import { z } from "zod";

export const ttsSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "El texto no puede estar vacío.")
    .max(1000, "El texto no puede superar los 1000 caracteres."),
});

export type TTSPayload = z.infer<typeof ttsSchema>;
