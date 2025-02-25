"use client"

import { useState, useEffect, useCallback } from "react"
import ChatView from "@/components/chat-view"
import KanbanView from "@/components/kanban-view"
import ThemeSelector from "@/components/theme-selector"
import { Repeat2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { themes, type ThemeKey } from "@/lib/themes"

export default function Page() {
  const [view, setView] = useState<"chat" | "kanban">("chat")
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("sunflower")

  // テーマを適用する関数
  const applyTheme = useCallback((themeKey: ThemeKey) => {
    const theme = themes[themeKey]
    const root = document.documentElement

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
      if (key === "primary") {
        root.style.setProperty("--ring", value)
      }
    })
  }, [])

  // テーマ変更ハンドラー
  const handleThemeChange = (themeKey: ThemeKey) => {
    setCurrentTheme(themeKey)
    applyTheme(themeKey)
  }

  // 初期テーマを適用
  useEffect(() => {
    applyTheme(currentTheme)
  }, [applyTheme, currentTheme])

  return (
    <div className="h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between p-4 border-b border-border/20">
        <h1 className="text-2xl font-bold text-foreground">{view === "chat" ? "Team Chat" : "Task Board"}</h1>
        <div className="flex items-center gap-2">
          <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView(view === "chat" ? "kanban" : "chat")}
            className="border-border/20 hover:bg-primary/10"
          >
            <Repeat2 className="h-4 w-4 text-secondary" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{view === "chat" ? <ChatView /> : <KanbanView />}</div>
    </div>
  )
}

