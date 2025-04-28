"use client";

import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { HeaderProps } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-white md:flex"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
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
        <div className="flex items-center gap-2">
          <h1 className="font-bold">Name Of Application</h1>
        </div>
      </div>
    </header>
  );
}
