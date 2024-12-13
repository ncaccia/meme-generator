import { db } from "~/app/db/db";
import { favorites } from "~/app/db/schema";
import { eq } from "drizzle-orm";
import { assertAuthenticated } from "~/lib/auth-utils";

export async function getUserFavoriteMeme() {
  const userId = await assertAuthenticated();

  const userFavorites = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, userId));

  return userFavorites;
}
