"use client"

import { useState, useEffect, useCallback } from "react"
import { Paintbrush } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Remove the # if present
  hex = hex.replace("#", "")

  // Convert hex to RGB
  const r = Number.parseInt(hex.substring(0, 2), 16) / 255
  const g = Number.parseInt(hex.substring(2, 4), 16) / 255
  const b = Number.parseInt(hex.substring(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export default function ThemeCustomizer() {
  const [colors, setColors] = useState({
    primary: "#0ea5e9",
    background: "#ffffff",
    foreground: "#020817",
  })

  const updateThemeColors = useCallback((key: string, hsl: { h: number; s: number; l: number }) => {
    const root = document.documentElement

    if (key === "primary") {
      root.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.style.setProperty("--ring", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
    } else if (key === "background") {
      root.style.setProperty("--background", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.style.setProperty("--card", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.style.setProperty("--popover", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.style.setProperty("--muted", `${hsl.h} ${hsl.s}% 96.1%`)
    } else if (key === "foreground") {
      root.style.setProperty("--foreground", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.style.setProperty("--card-foreground", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
      root.style.setProperty("--popover-foreground", `${hsl.h} ${hsl.s}% ${hsl.l}%`)
    }
  }, [])

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }))
    updateThemeColors(key, hexToHsl(value))
  }

  // Apply initial theme
  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) => {
      updateThemeColors(key, hexToHsl(value))
    })
  }, [colors, updateThemeColors]) // Only run once on mount

  return (
    <div className="relative inline-block">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="relative hover:bg-accent hover:text-accent-foreground"
          >
            <Paintbrush className="h-4 w-4" />
            <span className="sr-only">Customize theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" side="bottom" align="end" sideOffset={8}>
          <div className="grid gap-4">
            <h4 className="font-medium">Customize Theme</h4>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="primary">Primary Color</Label>
                <div className="relative">
                  <input
                    id="primary"
                    type="color"
                    value={colors.primary}
                    onChange={(e) => handleColorChange("primary", e.target.value)}
                    className="absolute inset-0 opacity-0 w-full cursor-pointer"
                  />
                  <div className="w-full h-8 rounded-md border" style={{ backgroundColor: colors.primary }} />
                </div>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="background">Background</Label>
                <div className="relative">
                  <input
                    id="background"
                    type="color"
                    value={colors.background}
                    onChange={(e) => handleColorChange("background", e.target.value)}
                    className="absolute inset-0 opacity-0 w-full cursor-pointer"
                  />
                  <div className="w-full h-8 rounded-md border" style={{ backgroundColor: colors.background }} />
                </div>
              </div>
              <div className="grid gap-1">
                <Label htmlFor="foreground">Text Color</Label>
                <div className="relative">
                  <input
                    id="foreground"
                    type="color"
                    value={colors.foreground}
                    onChange={(e) => handleColorChange("foreground", e.target.value)}
                    className="absolute inset-0 opacity-0 w-full cursor-pointer"
                  />
                  <div className="w-full h-8 rounded-md border" style={{ backgroundColor: colors.foreground }} />
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

