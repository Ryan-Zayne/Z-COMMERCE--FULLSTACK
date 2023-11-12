import type { LoginSchema, SignUpSchema } from '@/lib/schemas/formSchema';
import { z } from 'zod';

export type FormSchemaType = z.infer<typeof SignUpSchema> & z.infer<typeof LoginSchema>;

export type FormResponseDataType =
	| { accessToken: string; userName: string; email: string }
	| { errors: Array<[keyof FormSchemaType, string | string[]]> }
	| { title: string; message: string; stackTrace: string };
