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
- [ ] Drizzle ORM
- [ ] Authentication - Auth.js
- [ ] Google Asuth Setup
- [ ] Favorites Memes
- [ ] Search Pages
- [ ] Authorization Checks
- [ ] Favouriete Counts
- [ ] Clean up


## Possible Improvements

- [ ] search by tag that include the search param avoiding capitalization. Include containinig parts of the tag.
- [ ] Change the aspect ratio and scale of the image.
