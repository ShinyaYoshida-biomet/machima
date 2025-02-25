"use client"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { themes, type ThemeKey } from "@/lib/themes"

interface ThemeSelectorProps {
  currentTheme: ThemeKey
  onThemeChange: (theme: ThemeKey) => void
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Open theme settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(Object.keys(themes) as ThemeKey[]).map((themeKey) => (
          <DropdownMenuItem
            key={themeKey}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onThemeChange(themeKey)}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: themes[themeKey].colors.primary }} />
            <span>{themes[themeKey].name}</span>
            {currentTheme === themeKey && <span className="ml-auto text-primary">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

