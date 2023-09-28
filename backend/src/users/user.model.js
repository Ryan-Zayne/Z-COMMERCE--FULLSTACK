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
		role: [
			{
				type: String,
				default: 'user',
			},
		],
	},
	{ timestamps: true }
);

const User = model('User', userSchema);

export default User;
