import type { LoginSchema, SignUpSchema } from "@/lib/schemas/formSchema";
import { z } from "zod";

export type FormSchemaType = z.infer<typeof SignUpSchema> & z.infer<typeof LoginSchema>;
