import { defineEnum } from "@zayne-labs/toolkit-type-helpers";

export const RolesEnum = defineEnum({
	admin: "admin",
	member: "member",
});

export const PaymentStatusEnum = defineEnum({
	FAILED: "FAILED",
	PAID: "PAID",
	"REFUND-FAILED": "REFUND-FAILED",
	REFUNDED: "REFUNDED",
	UNPAID: "UNPAID",
});
