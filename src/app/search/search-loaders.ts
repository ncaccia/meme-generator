import { db } from "~/app/db/db";
import { favorites } from "~/app/db/schema";
import { count } from "drizzle-orm";

export async function getFavoritesCount() {
  const favoritesCount = await db
    .select({
      memeId: favorites.memeId,
      count: count(favorites.id),
    })
    .from(favorites)
    .groupBy(favorites.memeId);

  return favoritesCount;
}
