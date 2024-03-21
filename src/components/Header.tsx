"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";

import {
  NavigationMenuItem,
  NavigationMenu,
} from "@/components/ui/navigation-menu";

function Header() {
  return (
    <div className="bg-yellow-600 p-4 rounded-lg drop-shadow-md mt-2 mx-2">
      <div className="flex justify-between items-center">
        {/* Logo à gauche */}
        <NavigationMenu>
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
        </NavigationMenu>

        {/* Texte à droite */}
        <NavigationMenu>
          <NavigationMenuItem className="list-none">
            <Link href="/" className="text-white px-5">
              Campagnes
            </Link>
          </NavigationMenuItem>
          <span className=" h-10 w-[2px] bg-white mr-1"></span>
          <NavigationMenuItem className="list-none">
            <Link href="/campagnes/nouvelle-campagne" className="text-white">
              <PlusIcon className=" mx-5 h-5 w-5 " />
            </Link>
          </NavigationMenuItem>
        </NavigationMenu>
      </div>
    </div>
  );
}

export default Header;
