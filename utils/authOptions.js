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
			// 2. if user exists
			// 3. add user to db
			// 4. return true for sign in
		},
		// modifies the session object
		async session({ session }) {
			//1. get user from db
			//2. assign the user id with the session
			//3.return session
		},
	},
};
