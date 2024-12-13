// src/components/header.tsx

import { Package2, Palette, Search } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import ModeToggle from "~/components/ui/toggle-theme";
import SearchInput from "./search/search-input";
import { auth, signIn, signOut } from "~/auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Session } from "next-auth";

interface AccountMenuProps {
    session: Session | null;
}

export default async function Header() {
    const session = await auth()

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            {/* Desktop view */}
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Palette className="h-6 w-6" />
                    <span className="sr-only">Meme Generator</span>
                </Link>
                <Link
                    href="/search?q="
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Browse
                </Link>
                {session &&
                    <Link
                        href="/favorites"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Favorites
                    </Link>}
            </nav>

            {/* Mobile view */}

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Palette className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" >
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">Meme Generator</span>
                        </Link>
                        <Link
                            href="/search?q="
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Browse
                        </Link>
                        {session &&
                            <Link
                                href="/favorites"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Favorites
                            </Link>}
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">

                {/* Search From component in the header */}
                <form
                    action={async (formData) => {
                        "use server";
                        const search = formData.get("search");
                        redirect(`/search?q=${search}`);
                    }}
                    className="ml-auto flex-1 sm:flex-initial"
                >
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <SearchInput />
                    </div>
                </form>

                {/* Add the dark/light mode toggle button */}
                <ModeToggle />

                {/* Avatar dropdown menu component */}
                <AccountMenu session={session} />

            </div>
        </header>
    )
}

// export async function AccountMenu({ session }: AccountMenuProps) {
export async function AccountMenu({ session }: AccountMenuProps) {

    if (!session) {
        return (
            <form
                action={async () => {
                    "use server"
                    await signIn()
                }}
            >
                <Button type="submit" variant="outline">Sign In</Button>
            </form>
        )
    }

    const sessionUser = session.user;
    if (!sessionUser) return null
    const cleanImageUrl = sessionUser.image?.replace(/['"]+/g, '');

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        {cleanImageUrl && (
                            // Use Next.js Image component inside AvatarImage
                            <AvatarImage
                                src={cleanImageUrl}
                                alt={sessionUser.name || "User avatar"}
                                loading="eager" // Add loading="eager" to prioritize loading
                                sizes="32px" // Add sizes prop for optimization
                            />
                        )}
                        {/* Always render the fallback - it will only show if image fails */}
                        <AvatarFallback className="bg-muted">
                            {sessionUser.name
                                ? sessionUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
                                : 'U'
                            }
                        </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">

                {/* Show user info at the top of the dropdown */}
                <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{sessionUser.name}</div>
                    <div className="text-xs text-muted-foreground">{sessionUser.email}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form
                        action={async () => {
                            "use server"
                            await signOut()
                        }}
                    >
                        <button type="submit">Sign Out</button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}