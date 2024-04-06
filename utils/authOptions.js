import connectDB from "@/config/database";
import User from "@/models/User";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,

			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
			},
		}),
	],
	callbacks: {
		//on successful signin
		async signIn({ profile }) {
			// 1. conn to db
			await connectDB();
			// 2. if user exists
			const userExists = await User.findOne({ email: profile.email });
			// 3. add user to db
			if (!userExists) {
				const username = profile.name.slice(0, 20);

				await User.create({
					email: profile.email,
					username,
					image: profile.picture,
				});
			}
			// 4. return true for sign in
			return true;
		},
		// modifies the session object
		async session({ session }) {
			//1. get user from db
			const user = await User.findOne({ email: session.user.email });
			//2. assign the user id with the session
			session.user.id = user._id.toString();
			//3.return session
			return session;
		},
	},
};
