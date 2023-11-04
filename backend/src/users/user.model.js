import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Please add the user name'],
		},

		email: {
			type: String,
			required: [true, 'Please add the user email address'],
			unique: true,
			lowercase: true,
			trim: true,
		},

		password: {
			type: String,
			required: [true, 'Please add the user password'],
			select: false,
		},

		roles: {
			type: [String],
			default: ['user'],
		},

		refreshTokenArray: {
			type: [String],
			default: [],
			select: false,
		},
	},

	{ timestamps: true }
);

UserSchema.pre('save', async function hashPassword(next) {
	if (!this.isModified('password')) {
		next();
	}

	const saltRounds = 12;
	this.password = await bcrypt.hash(this.password, saltRounds);
});

UserSchema.method('comparePassword', async function comparePassword(plainPassword) {
	const isValidPassword = await bcrypt.compare(plainPassword, this.password);

	return isValidPassword;
});

const UserModel = model('User', UserSchema);

export default UserModel;
