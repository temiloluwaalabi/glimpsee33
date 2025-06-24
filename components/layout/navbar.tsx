"use client";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LogOutIcon, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { MenuItems } from "@/config/constants";
import { allRoutes } from "@/config/constants/routes";
import useSession from "@/hooks/use-session";

import { ModeToggle } from "./toggle-mode";
import { LogoutModal } from "../dialogs/logout-modal";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

export const Navbar = () => {
  const [openSheet, setopenSheet] = React.useState(false);

  const { session } = useSession();
  const pathname = usePathname();
  return (
    <header
      className={`dark:border-gray-700} sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:bg-gray-900/80`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="relative flex items-center space-x-2">
            <Link
              data-testid="home-link"
              className="absolute top-0 left-0 z-20 size-full"
              href={allRoutes.home.url}
            />
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
              <span className="text-sm font-bold text-white">FE</span>
            </div>
            <span className="text-xl font-bold">FeedExplorer</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            {MenuItems.map((item) => {
              const isActive = () => {
                // Exact match for the root dashboard
                if (item.href === "/dashboard") {
                  return pathname === "/dashboard";
                }

                // For other routes, check if the current path starts with the item's href
                // BUT make sure it's at the right "level" by checking path segments
                if (pathname.startsWith(item.href as string)) {
                  // Get the next segment after this item's path (if any)
                  const remainingPath = pathname.slice(
                    (item.href as string).length
                  );
                  // If there's no next segment or it starts with a slash followed by something,
                  // this is the correct active item
                  return remainingPath === "" || remainingPath.startsWith("/");
                }

                return false;
              };
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  data-testid={`nav-item-${item.name.toLowerCase()}`}
                  className={`font-medium transition-colors ${
                    isActive()
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1">
            {session?.isLoggedIn ? (
              <div className="flex items-center gap-1">
                <Avatar className="flex size-10 items-center justify-center">
                  <AvatarFallback>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white">
                      {session?.firstName?.charAt(0)}
                    </div>
                  </AvatarFallback>
                </Avatar>
                <LogoutModal
                  trigger={
                    <Button
                      variant={"ghost"}
                      className="hidden w-fit cursor-pointer items-center justify-start border border-red-900 bg-red-100 p-2 text-red-900 hover:bg-red-600 hover:px-2 hover:text-white md:flex"
                    >
                      <LogOutIcon className="mr-2 size-4" />
                      <span className="hidden md:flex">Logout</span>
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="hidden items-center space-x-3 md:flex">
                <Button className="relative rounded-lg border border-blue-600 bg-transparent px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                  Sign In
                  <Link
                    className="absolute top-0 left-0 z-50 size-full"
                    href={allRoutes.login.url}
                  />
                </Button>
                <Button className="relative hidden rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 md:block">
                  Sign Up
                  <Link
                    className="absolute top-0 left-0 z-50 size-full"
                    href={allRoutes.register.url}
                  />
                </Button>
              </div>
            )}
            <ModeToggle />

            <Sheet open={openSheet} onOpenChange={setopenSheet}>
              <SheetTrigger
                asChild
                className="z-50 lg:hidden"
                data-testid="mobile-menu-button"
              >
                <div className="hover:bg-accent flex size-[40px] cursor-pointer items-center justify-center rounded-md transition-colors hover:text-white">
                  <Menu className="size-7" />
                </div>
              </SheetTrigger>
              <SheetContent data-testid="mobile-menu">
                <div className="border-t border-gray-200 bg-white md:hidden dark:border-gray-700 dark:bg-gray-900">
                  <div className="space-y-3 px-4 py-3">
                    {MenuItems.map((item) => {
                      const isActive = pathname === (item.href as string);
                      return (
                        <SheetClose key={item.href} asChild>
                          <Link
                            href={item.href}
                            className={`block py-2 font-medium transition-colors ${
                              isActive
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </SheetClose>
                      );
                    })}
                    {!session?.isLoggedIn && (
                      <div className="flex gap-2 border-t border-gray-200 pt-3 dark:border-gray-700">
                        <SheetClose>
                          <Button
                            data-testid="mobile-sign-in-button"
                            className="relative rounded-lg border border-blue-600 bg-transparent px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            Sign In
                            <Link
                              className="absolute top-0 left-0 z-50 size-full"
                              href={allRoutes.login.url}
                            />
                          </Button>
                        </SheetClose>
                        <SheetClose>
                          <Button
                            data-testid="mobile-sign-up-button"
                            className="relative block rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                          >
                            Sign Up
                            <Link
                              className="absolute top-0 left-0 z-50 size-full"
                              href={allRoutes.register.url}
                            />
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
