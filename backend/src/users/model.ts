import { generateAccessToken, generateRefreshToken, hashPassword, verifyPassword } from "@/auth/services";
import mongoose from "mongoose";
import type { UserMethods, UserModelType, UserType } from "./types";

const UserSchema = new mongoose.Schema<UserType, unknown, UserMethods>(
	{
		username: {
			type: String,
			required: [true, "Please add the user name"],
		},

		email: {
			type: String,
			required: [true, "Please add the user email address"],
			unique: true,
			lowercase: true,
			trim: true,
		},

		password: {
			type: String,
			min: [8, "Password must be at least 8 characters long"],
			required: [true, "Password field is required"],
			select: false,
		},

		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},

		isSuspended: {
			type: Boolean,
			default: false,
		},

		isDeleted: {
			type: Boolean,
			default: false,
			select: false,
		},

		lastLogin: {
			type: Date,
			default: Date.now(),
		},

		loginRetries: {
			type: Number,
			default: 0,
			select: false,
		},

		refreshTokenArray: {
			type: [String],
			default: [],
			select: false,
		},
	},

	{ timestamps: true, versionKey: false }
);

UserSchema.pre("save", hashPassword);

UserSchema.method("verifyPassword", verifyPassword);
UserSchema.method("generateAccessToken", generateAccessToken);
UserSchema.method("generateRefreshToken", generateRefreshToken);

const UserModel =
	(mongoose.models.User as UserModelType | undefined) ??
	mongoose.model<UserType, UserModelType>("User", UserSchema);

export { UserModel };
