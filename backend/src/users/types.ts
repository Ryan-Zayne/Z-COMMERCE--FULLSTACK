import type { SignOptions } from "jsonwebtoken";
import type { HydratedDocumentFromSchema, Model, Schema } from "mongoose";

export type UserType = {
	address: string[];
	createdAt: Date;
	email: string;
	ipAddress: string;
	isDeleted: boolean;
	isEmailVerified: boolean;
	isIdVerified: boolean;
	isMobileVerified: boolean;
	isProfileComplete: boolean;
	isSuspended: boolean;
	lastLogin: number;
	loginRetries: number;
	password: string;
	passwordChangedAt: Date;
	passwordResetExpires: Date;
	passwordResetRetries: number;
	passwordResetToken: string;
	phoneNumber: string;
	refreshTokenArray: string[];
	role: "admin" | "user";
	updatedAt: Date;
	username: string;
	verificationToken: string;
};

export type HydratedUserType = Omit<
	HydratedDocumentFromSchema<Schema<UserType, unknown, UserMethods>>,
	"id"
> & { id: string };

export type UserMethods = {
	generateAccessToken: (options?: SignOptions) => string;
	generateRefreshToken: (options?: SignOptions) => string;
	verifyPassword: (enteredPassword: string | undefined) => Promise<boolean>;
};

export type UserModelType = Model<UserType, unknown, UserMethods>;
