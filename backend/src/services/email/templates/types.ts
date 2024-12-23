export type CommonData = {
	name?: string;
	to: string;
};

export type WelcomeEmailData = CommonData & {
	email: string;
	verificationLink: string;
};
