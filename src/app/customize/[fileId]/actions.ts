"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/app/db/db";
import { favorites } from "~/app/db/schema";
import { assertAuthenticated } from "~/app/lib/auth-utils";

export async function toggleFavouriteMemeAction(fileId: string) {
  const userId = await assertAuthenticated();

  // Check if the user has already liked the meme
  const favorite = await db.query.favorites.findFirst({
    // This is read: find us the meme where the user id is equal to the user id and the meme id is equal to the meme id.
    where: and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)),
  });

  // if the user has already liked the meme, remove the like
  if (favorite) {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.memeId, fileId)));
  } else {
    // if the user has not liked the meme, add a like
    await db.insert(favorites).values({
      userId,
      memeId: fileId,
    });
  }

  // Remove the cached version of the page and revalidate the page with the new data
  revalidatePath(`/customize/${fileId}`);
}
