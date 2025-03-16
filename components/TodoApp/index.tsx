// components/tasks/index.tsx
"use client";

import { useEffect, useState } from "react";

import { DndContext, closestCorners, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Column } from "./Column";

interface Task {
  id: string;
  title: string;
  status: "A fazer" | "Pausado" | "Em progresso" | "Finalizado";
}

const statuses = ["A fazer", "Pausado", "Em progresso", "Finalizado"];

export function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data.data);
    }

    fetchTasks();
  }, []);

  async function updateTaskStatus(id: string, newStatus: Task["status"]) {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
      headers: { "Content-Type": "application/json" },
    });

    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const draggedTaskId = active.id as string;
    const newStatus = over.id as Task["status"];

    const task = tasks.find((t) => t.id === draggedTaskId);
    if (task && task.status !== newStatus) {
      updateTaskStatus(draggedTaskId, newStatus);
    }
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-4 p-6">
        {statuses.map((status) => (
          <SortableContext
            key={status}
            items={tasks}
            strategy={verticalListSortingStrategy}
          >
            <Column
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
            />
          </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
