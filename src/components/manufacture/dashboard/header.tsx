"use client";

import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { HeaderProps } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import Image from "next/image";

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-2 text-white">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo - Hidden on mobile */}
        <div className="hidden md:block">
          <Image
            src="/icons/icon-512x512.png"
            alt="JS Logo"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        {/* Mobile Content - Only shows user info and app name */}
        <div className="flex flex-1 items-center justify-between md:hidden">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=AR&background=random`}
                alt="User"
              />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h1 className="font-bold">A. RISYAN</h1>
              <p className="text-xs opacity-80">Dept. Engineering</p>
            </div>
          </div>
        </div>

        {/* Desktop Content - Shows everything */}
        <div className="hidden flex-1 items-center justify-between md:flex">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=AR&background=random`}
                  alt="User"
                />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <h1 className="text-lg font-bold">Name Of Application</h1>
        </div>
      </div>
    </header>
  );
}
