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
		role: [
			{
				type: String,
				default: 'user',
			},
		],
	},

	{
		methods: {
			async comparePassword(enteredPassword) {
				const isValidPassword = await bcrypt.compare(enteredPassword, this.password);

				return isValidPassword;
			},
		},
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

const User = model('User', userSchema);

export default User;
