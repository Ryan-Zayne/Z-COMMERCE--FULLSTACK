import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Please add the user name'],
		},

		email: {
			type: String,
			required: [true, 'Please add the user email address'],
			unique: [true, 'Email already exists'],
		},

		password: {
			type: String,
			required: [true, 'Please add the user password'],
		},

		roles: {
			type: [String],
			default: ['user'],
		},

		refreshTokenArray: {
			type: [String],
			default: [],
		},
	},

	{
		timestamps: true,
	}
);

userSchema.pre('save', async function hashPassword(next) {
	if (!this.isModified('password')) {
		next();
		return;
	}

	const saltRounds = 10;
	this.password = await bcrypt.hash(this.password, saltRounds);
});

userSchema.methods = {
	comparePassword: async function comparePassword(plainPassword) {
		const isValidPassword = await bcrypt.compare(plainPassword, this.password);

		return isValidPassword;
	},
};

const UserModel = model('User', userSchema);

export default UserModel;
