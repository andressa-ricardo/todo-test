"use client";

import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TodoDroppableContainer } from "./TodoDroppableContainer";
import { TaskCard } from "./TaskCard";
import { ITaskTable } from "@/lib/task/ITaskTable";
import { createTask, fetchTasks, updateTaskStatus } from "./apiClient";

const statuses: ITaskTable["status"][] = [
  "A fazer",
  "Pausado",
  "Em progresso",
  "Finalizado",
];

export function TodoApp() {
  const [tasks, setTasks] = useState<ITaskTable[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    async function loadTasks() {
      const data = await fetchTasks();
      setTasks(data);
    }

    loadTasks();
  }, []);

  async function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id
          ? { ...task, status: over.id.toString() as ITaskTable["status"] }
          : task
      )
    );

    await updateTaskStatus(
      Number(active.id),
      over.id.toString() as ITaskTable["status"]
    );
  }

  async function addTask() {
    if (!newTaskTitle.trim()) return;

    const newTask = await createTask(newTaskTitle);

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      {/* Área de entrada para adicionar novas tarefas */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Digite uma nova tarefa..."
          className="border rounded p-2 w-full"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {statuses.map((status) => (
          <TodoDroppableContainer id={status} key={status}>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard key={task.id} id={task.id}>
                  {task.title}
                </TaskCard>
              ))}
          </TodoDroppableContainer>
        ))}
      </div>
    </DndContext>
  );
}
