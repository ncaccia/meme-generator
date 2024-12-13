import { db } from "~/app/db/db";
import { favorites } from "~/app/db/schema";
import { and, eq } from "drizzle-orm";
import { assertAuthenticated } from "~/lib/auth-utils";

export async function getFavoriteMeme(fileId: string) {
  const userId = await assertAuthenticated();

  const favorite = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.memeId, fileId), eq(favorites.userId, userId)));

  // The double bang (!!) is a way to explicitly convert a value to its boolean equivalent.  finds a favorite, it returns an array (even if empty), and !! converts this to true or false based on whether a matching favorite was found. Used .length to check if the array is empty

  return !!favorite.length;
}
