"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarProviderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContext = React.createContext<{
  collapsible: "icon" | "full" | "none"
}>({
  collapsible: "none",
})

const SidebarProvider = React.forwardRef<HTMLDivElement, SidebarProviderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex", className)} {...props}>
        {children}
      </div>
    )
  },
)
SidebarProvider.displayName = "SidebarProvider"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: "icon" | "full" | "none"
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, collapsible = "none", children, ...props }, ref) => {
    return (
      <SidebarContext.Provider value={{ collapsible }}>
        <div ref={ref} className={cn("flex flex-col gap-4 border-r", className)} {...props}>
          {children}
        </div>
      </SidebarContext.Provider>
    )
  },
)
Sidebar.displayName = "Sidebar"

const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex-1 overflow-hidden", className)} {...props}>
        {children}
      </div>
    )
  },
)
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    )
  },
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-1", className)} {...props}>
        {children}
      </div>
    )
  },
)
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props}>
        {children}
      </div>
    )
  },
)
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        {children}
      </div>
    )
  },
)
SidebarMenuItem.displayName = "SidebarMenuItem"

interface SidebarMenuButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
  asChild?: boolean
}

const SidebarMenuButton = React.forwardRef<HTMLDivElement, SidebarMenuButtonProps>(
  ({ className, isActive, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? "div" : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
}

