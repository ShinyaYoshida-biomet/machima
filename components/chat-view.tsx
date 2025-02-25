"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bold, Code } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for demonstration
const MOCK_MESSAGES = [
  {
    id: 1,
    user: "Sarah Chen",
    avatar: "/placeholder.svg",
    message: "🌻 Good morning everyone! How's everyone doing today?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    user: "Alex Kim",
    avatar: "/placeholder.svg",
    message: "Morning! ☀️ Just finished reviewing the new design proposals.",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    user: "Maria Garcia",
    avatar: "/placeholder.svg",
    message: "They look amazing! Love the warm color palette we chose! 🌻",
    timestamp: "10:35 AM",
  },
]

const MOCK_SUGGESTIONS = [
  "I'll take a look at that",
  "Great work everyone!",
  "Can we schedule a meeting to discuss this?",
  "Let me know if you need any help",
  "I'm working on it now",
]

function formatMessage(text: string) {
  // Replace code blocks
  text = text.replace(
    /```([\s\S]*?)```/g,
    (_, code) => `<pre class="bg-muted p-2 rounded-md my-2 font-mono text-sm overflow-x-auto">${code}</pre>`,
  )

  // Replace bold text
  text = text.replace(/\*(.*?)\*/g, "<strong>$1</strong>")

  // Replace newlines with <br>
  text = text.replace(/\n/g, "<br>")

  return text
}

export default function ChatView() {
  const [messages, setMessages] = useState(MOCK_MESSAGES)
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  // 入力欄の高さを自動調整する関数
  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setInput(value)
    adjustTextareaHeight()

    if (value.length > 2) {
      const filtered = MOCK_SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        // Shift + Enter の場合は改行を許可
        return
      } else {
        // Enter のみの場合はメッセージを送信
        e.preventDefault()
        handleSend()
      }
    }
  }

  const handleSend = () => {
    if (input.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          avatar: "/placeholder.svg",
          message: input.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
      setInput("")
      setSuggestions([])
      // 入力欄の高さをリセット
      if (inputRef.current) {
        inputRef.current.style.height = "auto"
      }
    }
  }

  const handleFormat = (type: "bold" | "code") => {
    if (!inputRef.current) return

    const start = inputRef.current.selectionStart
    const end = inputRef.current.selectionEnd
    const text = input

    if (type === "bold") {
      const newText = text.slice(0, start) + "*" + text.slice(start, end) + "*" + text.slice(end)
      setInput(newText)
    } else if (type === "code") {
      const newText = text.slice(0, start) + "```\n" + text.slice(start, end) + "\n```" + text.slice(end)
      setInput(newText)
    }

    // Restore focus after formatting
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(start, end)
        adjustTextareaHeight()
      }
    }, 0)
  }

  return (
    <div className="grid grid-cols-[240px_1fr] h-full">
      <div className="border-r border-border/20 p-4 bg-background">
        <div className="font-semibold mb-4 text-foreground">Channels</div>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-primary/10">
            # general
          </Button>
          <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-primary/10">
            # development
          </Button>
          <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-primary/10">
            # design
          </Button>
        </div>
        <div className="font-semibold mt-8 mb-4 text-foreground">Direct Messages</div>
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-primary/10">
            Sarah Chen
          </Button>
          <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-primary/10">
            Alex Kim
          </Button>
          <Button variant="ghost" className="w-full justify-start text-secondary hover:bg-primary/10">
            Maria Garcia
          </Button>
        </div>
      </div>
      <div className="flex flex-col h-full bg-[#FFFAF0]">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex items-start gap-3", msg.user === "You" && "justify-end")}>
                {msg.user !== "You" && (
                  <Avatar>
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback className="bg-[#FFD700]/20">{msg.user[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-[#1A472A]">{msg.user}</span>
                    <span className="text-xs text-[#2F4F4F]/70">{msg.timestamp}</span>
                  </div>
                  <div
                    className="mt-1 text-sm bg-primary/10 rounded-lg p-2 text-secondary"
                    dangerouslySetInnerHTML={{ __html: formatMessage(msg.message) }}
                  />
                </div>
                {msg.user === "You" && (
                  <Avatar>
                    <AvatarImage src={msg.avatar} />
                    <AvatarFallback className="bg-[#FFD700]/20">Y</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-[#2F4F4F]/20">
          <div className="flex gap-2 mb-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("bold")}>
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleFormat("code")}>
              <Code className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message... (Shift + Enter for new line)"
              className="pr-20 min-h-[48px] max-h-[200px] resize-none border-border/20 focus:border-primary focus:ring-primary"
              onSelect={(e) => {
                const target = e.target as HTMLTextAreaElement
                setSelectionStart(target.selectionStart)
                setSelectionEnd(target.selectionEnd)
              }}
            />
            <Button
              onClick={handleSend}
              className="absolute right-1 top-1 h-8 bg-[#FFD700] hover:bg-[#FFD700]/90 text-[#1A472A]"
            >
              Send
            </Button>
            {suggestions.length > 0 && (
              <div className="absolute bottom-full mb-1 w-full bg-background border rounded-lg shadow-lg">
                {suggestions.map((suggestion, i) => (
                  <Button
                    key={i}
                    variant="ghost"
                    className="w-full justify-start rounded-none h-auto p-2 text-sm"
                    onClick={() => {
                      setInput(suggestion)
                      setSuggestions([])
                      adjustTextareaHeight()
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

