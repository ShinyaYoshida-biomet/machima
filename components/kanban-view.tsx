"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Mock data for demonstration
const INITIAL_DATA = {
  todo: [
    { id: "task-1", content: "Design new landing page" },
    { id: "task-2", content: "Fix navigation bug" },
  ],
  inProgress: [
    { id: "task-3", content: "Implement authentication" },
    { id: "task-4", content: "Add dark mode support" },
  ],
  done: [
    { id: "task-5", content: "Update dependencies" },
    { id: "task-6", content: "Write documentation" },
  ],
}

const MOCK_SUGGESTIONS = [
  "Design system updates",
  "Fix responsive layout",
  "Update API documentation",
  "Implement new features",
  "Code review pending PRs",
]

export default function KanbanView() {
  const [columns, setColumns] = useState(INITIAL_DATA)
  const [newTask, setNewTask] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [activeColumn, setActiveColumn] = useState<keyof typeof INITIAL_DATA | null>(null)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const { source, destination } = result

    if (source.droppableId === destination.droppableId) {
      const column = [...columns[source.droppableId as keyof typeof columns]]
      const [removed] = column.splice(source.index, 1)
      column.splice(destination.index, 0, removed)

      setColumns({
        ...columns,
        [source.droppableId]: column,
      })
    } else {
      const sourceColumn = [...columns[source.droppableId as keyof typeof columns]]
      const destColumn = [...columns[destination.droppableId as keyof typeof columns]]
      const [removed] = sourceColumn.splice(source.index, 1)
      destColumn.splice(destination.index, 0, removed)

      setColumns({
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      })
    }
  }

  const handleInputChange = (value: string) => {
    setNewTask(value)
    if (value.length > 2) {
      const filtered = MOCK_SUGGESTIONS.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  const addNewTask = (columnId: keyof typeof columns) => {
    if (newTask.trim()) {
      const newTaskId = `task-${Date.now()}`
      setColumns({
        ...columns,
        [columnId]: [...columns[columnId], { id: newTaskId, content: newTask.trim() }],
      })
      setNewTask("")
      setSuggestions([])
      setActiveColumn(null)
    }
  }

  return (
    <div className="p-4 h-full bg-background">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 h-full">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <div key={columnId} className="flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold capitalize text-[#1A472A]">
                  {columnId.replace(/([A-Z])/g, " $1").trim()}
                </h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setActiveColumn(columnId as keyof typeof columns)}
                  className="hover:bg-[#FFD700]/10"
                >
                  <Plus className="h-4 w-4 text-[#2F4F4F]" />
                </Button>
              </div>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex-1 bg-primary/5 rounded-lg p-2 space-y-2 border border-border/10"
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-background border-border/20 shadow-sm hover:border-primary"
                          >
                            <CardContent className="p-4 text-sm text-secondary">{task.content}</CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {activeColumn === columnId && (
                      <div className="relative mt-2">
                        <Input
                          value={newTask}
                          onChange={(e) => handleInputChange(e.target.value)}
                          placeholder="Add new task..."
                          className="bg-[#FFFAF0] border-[#2F4F4F]/20 focus:border-[#FFD700] focus:ring-[#FFD700]"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addNewTask(columnId as keyof typeof columns)
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}

