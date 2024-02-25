"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  NavigationMenuItem,
  NavigationMenu,
} from "@/components/ui/navigation-menu";

function Header() {
  return (
    <div className="bg-gray-700 p-4">
      <div className=" w-full mx-auto px-4 sm:px-6 lg:px-8">
        <NavigationMenu className="flex items-center justify-around">
          <NavigationMenuItem className="mr-4 list-none">
            <Link href="/">
              <Image
                priority
                src="/image/logoipsum-296.svg"
                height={32}
                width={32}
                alt="logo"
              />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className=" list-none">
            <Link href="/" className="text-white ">
              Documentation
            </Link>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default Header;
