"use client"
import { Cross } from 'lucide-react';
import Link from "next/link"
import { Bell, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  const { setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-background/30 dark:bg-black/30 backdrop-blur-lg shadow-sm h-16 flex items-center px-4 md:px-6 [mask-image:linear-gradient(to_bottom,white_80%,transparent)]">
      <div className="flex items-center w-full justify-between">
        <Link href="/" className="flex flex-row items-center gap-1">
          <Cross className='text-red-500 w-5 h-5' strokeWidth={2.5}/>
          <span className="text-xl font-logo tracking-normal">MediTrack</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>

  )
}
