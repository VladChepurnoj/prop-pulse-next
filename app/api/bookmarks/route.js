import connectDB from "@/config/database";
import User from "@/models/User";
import Property from "@/model/Property";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
	try {
		await connectDB();

		const { propertyId } = await request.json();

		const sessionUser = await getSessionUser();

		if (!sessionUser || !sessionUser.userId) {
			return new Response("User if is required", { status: 401 });
		}

		const { userId } = sessionUser;

		//find user in db
		const user = await User.findOne({ _id: userId });

		//check if prop is bookmarked
		let isBookmarked = user.bookmarks.includes(propertyId);

		let message;

		if (isBookmarked) {
			// if bookmarked, remove it
			user.bookmarks.push(propertyId);
			message = "Bookmark removed successfully";
			isBookmarked = false;
		} else {
			//if not bookmarked add it
			user.bookmarks.push(propertyID);
			message = "Bookmark added successfully";
			isBookmarked = true;
		}

		await user.save();

		return new Response(JSON.stringify({ message, isBookmarked }), {
			status: 200,
		});
	} catch (error) {
		console.log(error);
		return new Response("Something went wrong", { status: 500 });
	}
};
