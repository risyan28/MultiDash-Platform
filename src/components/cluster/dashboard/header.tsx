"use client";

import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import type { HeaderProps } from "./types";

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-purple-700 to-indigo-600 p-4 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Menu button - Hidden on mobile, visible on desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-white hover:bg-white/20 md:flex"
            onClick={onMenuClick}
          >
            <Menu className="h-10 w-10" />
          </Button>
          <div className="flex items-center gap-3">
            {/* Right-side image - even smaller height */}
            <div className="hidden md:block">
              <Image
                src="/images/cluster-logo.png?height=50&width=250"
                width={250}
                height={50}
                alt="Community"
                className="h-[50px] w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2"></div>
      </div>
    </header>
  );
}
