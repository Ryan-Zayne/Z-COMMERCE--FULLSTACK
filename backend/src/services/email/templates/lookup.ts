import { welcomeEmail } from "./welcomeEmail";

export const TEMPLATES_LOOKUP = {
	welcomeEmail: {
		from: "DigitalGenie <donotreply@digitalgenie.me>",
		subject: "Welcome to DigitalGenie",
		template: welcomeEmail,
	},
};
