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
- [ ] Meme Search functionality
  - [x] Add Search component on the navBar c/p header from shadcn
  - [x] Create server action to send search query as parameter,
  - [x] Add search page to show results /search as cards 
    - [x] Add imagekit nodejs library https://www.npmjs.com/package/imagekit + types
    - [x] Move imagekit provider to a separate component + add it to the main layout
    - [x] Create a image result component -> map all the images fetched on the searchResult page. 
    - [x] add cards to each image on the search component
  - [ ] Fix dark-mode theme on [shadcn theme](https://ui.shadcn.com/docs/dark-mode/next) -> pnpm add next-themes 
    - [x] Note: I have to add a **suppressHydrationWarning** on the main layout to helps handle hydration mismatches between server and client rendering
    - [x] Create a toogle-theme component + add it to the header
  - [x] fix responsiveness of the cards -> add px-4 to /search page + break grid-cols on sm and md
  - [x] fix search input to contain the value of the search param -> transform the input part of the search component into a client one -> I used a hook useSearchParams "next/navigation".
- [ ] Add custom metadata as name for imagekit assets (displayName)
- [ ] Add tags to imgs to search by theme
- [ ] Node SDK
- [ ] Meme Cards
- [ ] Theme toogle
- [ ] Responsive design
- [ ] Custom Metadata
- [ ] Upload Dialog
- [ ] Imgs tags
- [ ] Customize Page
- [ ] Position Overlays
- [ ] Components improvement
- [ ] Append Overlay
- [ ] Text Background
- [ ] Debounce
- [ ] Image Filters
- [ ] Download Button
- [ ] Drizzle ORM
- [ ] Authentication - Auth.js
- [ ] Google Asuth Setup
- [ ] Favorites Memes
- [ ] Search Pages
- [ ] Authorization Checks
- [ ] Favouriete Counts
- [ ] Clean up