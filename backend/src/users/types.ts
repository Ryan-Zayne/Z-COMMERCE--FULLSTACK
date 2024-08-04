import type { SignOptions } from "jsonwebtoken";
import type { HydratedDocumentFromSchema, Model, Schema } from "mongoose";

export type UserType = {
	username: string;
	email: string;
	password: string;
	refreshTokenArray: string[];
	role: "user" | "admin";
	isProfileComplete: boolean;
	phoneNumber: string;
	verificationToken: string;
	passwordResetToken: string;
	passwordResetExpires: Date;
	passwordResetRetries: number;
	passwordChangedAt: Date;
	ipAddress: string;
	loginRetries: number;
	address: string[];
	isIdVerified: boolean;
	isSuspended: boolean;
	isDeleted: boolean;
	lastLogin: number;
	isMobileVerified: boolean;
	isEmailVerified: boolean;
	createdAt: Date;
	updatedAt: Date;
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
