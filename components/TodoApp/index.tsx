"use client";

import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TodoDroppableContainer } from "./TodoDroppableContainer";
import { TaskCard } from "./TaskCard";
import { ITaskTable } from "@/lib/task/ITaskTable";

const statuses: ITaskTable["status"][] = [
  "A fazer",
  "Pausado",
  "Em progresso",
  "Finalizado",
];

export function TodoApp() {
  const [tasks, setTasks] = useState<ITaskTable[]>([
    {
      id: "1",
      title: "Fazer relatório",
      status: "A fazer",
      created_at: new Date(),
      user_id: "123123",
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id.toString()
          ? { ...task, status: over.id.toString() as ITaskTable["status"] }
          : task
      )
    );
  }

  function addTask() {
    if (!newTaskTitle.trim()) return;

    const newTask: ITaskTable = {
      id: String(tasks.length + 1),
      title: newTaskTitle,
      status: "A fazer",
      user_id: "12093813",
      created_at: new Date(),
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle(""); // Limpar o campo de input
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

      {/* Área do Kanban */}
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
