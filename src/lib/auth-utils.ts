import { auth } from "~/auth";

export async function assertAuthenticated() {
  // Check if the user is logged in
  const session = await auth();

  // if not, throw an error
  if (!session) {
    throw new Error("Unauthorized");
  }

  // if yes, Get the user id
  const userId = session.user?.id;

  // if there is a problem with userId, throw an error
  if (!userId) {
    throw new Error("User ID not found");
  }

  return userId;
}
