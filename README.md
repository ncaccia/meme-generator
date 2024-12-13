# Meme Generator

Build a Full Stack Meme Generator (ImageKit, Next.js, Auth.js, Drizzle, Neon)

Basicall

## To-do

- [x] Install next `pnpx create-next-app@latest`
- [x] Install imageKit sdk -> https://imagekit.io/docs/integration/nextjs#uploading-files-in-next.js
- [x] Upload img component
  - [x] being able to upload the image to imagekit, and display it on the page as soon as uploaded -> create a const for the path and find it inside the image object.
- [x] Install shadcn UI to the project `pnpm dlx shadcn@latest init` + add a component to test it.
  - [x] pnpm dlx shadcn@latest add sheet
- [x] Meme Search functionality
  - [x] Add Search component on the navBar c/p header from shadcn
  - [x] Create server action to send search query as parameter,
  - [x] Add search page to show results /search as cards
    - [x] Add imagekit nodejs library https://www.npmjs.com/package/imagekit + types
    - [x] Move imagekit provider to a separate component + add it to the main layout
    - [x] Create a image result component -> map all the images fetched on the searchResult page.
    - [x] add cards to each image on the search component
- [x] Theme toogle
  - [x] Fix dark-mode theme on [shadcn theme](https://ui.shadcn.com/docs/dark-mode/next) -> pnpm add next-themes
    - [x] Note: I have to add a **suppressHydrationWarning** on the main layout to helps handle hydration mismatches between server and client rendering
    - [x] Create a toogle-theme component + add it to the header
- [ ] Responsive design
  - [x] fix responsiveness of the cards -> add px-4 to /search page + break grid-cols on sm and md
  - [x] fix search input to contain the value of the search param -> transform the input part of the search component into a client one -> I used a hook useSearchParams "next/navigation".
- [x] Add custom metadata as name for imagekit assets (displayName)
- [x] Meme card footer button to generate meme
  - [x] Add a <link> into /customize/fileId
- [x] Upload Dialog on the home page.
  - [x] Add a buttom to the home page.
  - [x] installa shadcn dialog component -> Dialog has triggers that initiate them, like buttons.
  - [x] Input to add displayName to meme / handle submit and dialog close
- [x] Imgs tags on the upload process + normalized them
- [x] Refactor search by tag + add badge on tags from the meme card component.
- [x] add /customize/[FileId]/ Page
  - [x] refactor imageKit utility out of the pages.
- [x] create a CustomizePanel component --> Warning: Only plain objects can be passed to Client Components from Server Components. 
  - Note: in next we mostrly use Server Components to fetch the data and Client Components to render it.
- [x] add slider component --> https://imagekit.io/docs/transformations#position-of-layer
- [x] Fix transformation to receive x/y position input
- [x] Components improvement - add multiple textOverley
  - Note: need to understand this better, why I use an onUpdate and pass it to the text-overlay component?
- [x] Append and remove text Overlay = useState with numberOfOveralys set
  - [x] Add a individual remove button for each overlay + re-index to avoid gaps.
- [x] Text Background -> using [color-picker](https://casesandberg.github.io/react-color/)
  - [x] Fix bugs: checkbox false doesnt remove the colorBackground + default text donsnt render on mount
- [x] Debounce (avoid request on every onUpdate re-render)
  - [x] Add lodash library `pnpm add lodash -D @types/lodash`
- [x] add Image Filters
  - [c] refactor it to allow multiple filters through .map checkboxes.
- [x] refactor layout to keep image sticky on top while scrolling cards.
- [x] Download Button
  - Select the image element using querySelector
  - Fetch the image data using the fetch API
  - Convert the response into a format we can download === Blob object -> A Binary-Large-OBject (BLOB)  container or package that holds raw data. It can represent images, audio, or other multimedia. The `blob()` method is specifically designed to extract the binary data from a fetch response. When you want to download an image, you need:
      - The address (URL) to find the image (you have this in imageData.src)
      - A way to go get the image data (that's what fetch does)
      - A way to package that data for download (that's what blob() does) -> use FileReader() or URL.createObjectURL() to read the contents
      - Important: when you look at imageData.src, it might be showing what we call a "blob URL" or a temporary URL that only works for displaying the image in your browser, but not for downloading. This is why we use the fetch + blob approach instead.
  - Create a download link
  - Trigger the download
  - clean up the code
- [x] Drizzle ORM
  - [x] setup db -> [Neon](https://orm.drizzle.team/docs/connect-neon) (NOTE: on next is is complex to setup a postgres)
    - [x] create a folder for the src/app/db -> "db" -> file db.ts
    - [x] setup drizzle-kit (2 migrate schemas) -> create a drizzle.config.ts -> set where shcema is located.
    - [x] setup drizzle-kit to manage migrations
- [x] Authentication - Auth.js -> `pnpm add next-auth@beta`
  - [x] add mandatory env varAUTH_SECRET === random value used by the library to encrypt tokens and email verification hashes.
  - [x] create an `src/auth.ts`
  - [x] create the auth route `api/auth/[...nextauth]/route.ts`
  - [x] create the middleware `auth` 
  - [x] Connect to the db -> https://authjs.dev/getting-started/adapters/drizzle
    - [ ] add the adapter:
  - [x] `pnpm drizzle-kit push` to migrate the first schema -> check on neon/tables to see if worked correctly.
  - [x] check/show on the header if the user is logged in.
  - [x] [Google Auth provider ](https://authjs.dev/getting-started/providers/google)Setup
    - note: for the authorized redirect URIs -> http://localhost:300/api/auth/callback/google
- [x] DB: create an user account
- [x] Add avatar w/google photo and google info to the user menu.
- [x] track if user is liking which meme.
  - [x] new table: `favorites`(who likes = `userId`, what it likes = `memeId`)
  - [X] Add a form and heart button to the customize panel 
  - [x] Add server action to the heart button send the like count to the db table "favorites" (add or delete favourite record) --> create a separete actions.ts file
  - [x] Create a `loadear.ts` to pre-check if the user has liked the current meme to change the color of the heart icon.
  - [X] Create an auth util to avoid repeating the session check en every component.
  - [x] Add the isFavorite variable to the page and customize panel components.
    - [x] add a turnery to the like button `{isFavorited ? <Heart fill="black" /> : <Heart fill="white" />}`
- [ ] DB: create meme user colletion
- [ ] Favorites Memes
- [ ] Search Pages
- [ ] Authorization Checks
- [ ] Favouriete Counts
- [ ] Clean up


## Possible Improvements

- [ ] search by tag that include the search param avoiding capitalization. Include containinig parts of the tag.
- [ ] Change the aspect ratio and scale of the image.

## SPECIAL NOTES

How drizzle + Neon + AuthJS work together. The flow works like this:

### Authentication Flow:

  1. User attempts to access protected route
  2. `middleware.ts` checks authentication status -> `export { auth as middleware } from "~/auth";`
  3. If not authenticated, redirects to auth route
  4. `route.ts` handles authentication requests via handlers
  5. Auth.js manages the OAuth flow with Google

### Database Integration:

  1. `db.ts`  establishes (only) connection to Neon -> handles **HOW** we connect to the database
  2. `schema.ts` defines your database structure -> defines **WHAT** our database looks like
  3. DrizzleAdapter connects Auth.js to your database ->  acts like a translator between Auth.js and your Neon database. 
  4. User data is stored in the defined tables

### Protection Layer:

   1. middleware.ts protects your routes
   2. Can be configured to protect specific paths
   3. Integrates with Auth.js session management

### Nextjs server actions best practice
  - Create a new file `actions.ts` in the same /route we are working
  - They are executed by <forms> + `action={}` atribute, different to `onSubmit` (it tells nextjs to execute the action instead of the client side submition)
    - the form will work even if the JS is dissable on the browser.
    - it requires `revalidatePath('/any-route')`;  to Server-side cache reset the page.



### Drizzle Notes

- we need to add the schema to our db file in order to get type safety and improve dev experience.
    ```js
    import { neon } from "@neondatabase/serverless";
    import { drizzle } from "drizzle-orm/neon-http";
    import * as schema from "./schema";   <---- THIS

    const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
    const db = drizzle(sql, { schema });  <---- HERE

    export { db };
    ```

- 