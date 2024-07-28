import React from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./button";
export default function NavBar() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <header className="bg-white px-6 py-4 shadow-md dark:bg-gray-950">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2"
            prefetch={false}
          >
            <span className="text-lg font-bold">FuelTally</span>
          </Link>
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 md:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-64 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-950">
                <nav className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    prefetch={false}
                  >
                    Dashboard
                  </Link>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      signOut({ callbackUrl: "/" }).catch((error: Error) => {
                        console.error("Sign out error", error);
                      });
                    }}
                  >
                    Sign Out
                  </Button>
                </nav>
              </PopoverContent>
            </Popover>
            <nav className="hidden space-x-4 md:flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  signOut({ callbackUrl: "/" }).catch((error: Error) => {
                    console.error("Sign out error", error);
                  });
                }}
              >
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

function MenuIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
