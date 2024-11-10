import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Image as ImageIcon,
  Users,
  Heart,
  Search,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-6 gap-8">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <ImageIcon className="w-5 h-5 text-white" />
      </div>
      <nav className="flex flex-col gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-lg">
            <Home className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/artwork">
          <Button variant="ghost" size="icon" className="rounded-lg">
            <ImageIcon className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/artist">
          <Button variant="ghost" size="icon" className="rounded-lg">
            <Users className="w-5 h-5" />
          </Button>
        </Link>
        <Link href="/favorites">
          <Button variant="ghost" size="icon" className="rounded-lg">
            <Heart className="w-5 h-5" />
          </Button>
        </Link>
      </nav>
      <div className="mt-auto">
        <Button variant="ghost" size="icon" className="rounded-lg">
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
