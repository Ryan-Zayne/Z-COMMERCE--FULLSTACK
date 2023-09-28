import type { LoginSchema, SignUpSchema } from '@/lib/schemas/formSchema';
import { z } from 'zod';

export type SetIsLoginProp = {
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormSchemaType = z.infer<typeof SignUpSchema> & z.infer<typeof LoginSchema>;
