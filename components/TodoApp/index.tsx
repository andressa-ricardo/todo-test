"use client";

import React, { useEffect, useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { TodoDroppableContainer } from "./TodoDroppableContainer";
import { TaskCard } from "./TaskCard";
import { ITaskTable } from "@/lib/task/ITaskTable";
import { createTask, fetchTasks, updateTask, deleteTask } from "./apiClient";
import { TaskModal } from "./TaskModal";

const statuses: ITaskTable["status"][] = [
  "A fazer",
  "Pausado",
  "Em progresso",
  "Finalizado",
];

export function TodoApp() {
  const [tasks, setTasks] = useState<ITaskTable[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedTask, setSelectedTask] = useState<ITaskTable | null>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      const data = await fetchTasks();
      setTasks(data);
    }
    loadTasks();
  }, []);

  async function onDragEnd(event: DragEndEvent) {
    setDragging(false);
    const { active, over } = event;
    if (!over) return;

    // Verificar se a tarefa realmente mudou de status
    const newStatus = over.id.toString() as ITaskTable["status"];

    const taskUpdated =
      newStatus !== (active.data.current as ITaskTable).status;

    if (!taskUpdated) {
      setSelectedTask(active.data.current as ITaskTable);
      return;
    }

    setTasks((prev) =>
      prev.map((task) =>
        task.id === active.id ? { ...task, status: newStatus } : task
      )
    );

    await updateTask({
      ...(active.data.current as ITaskTable),
      status: newStatus,
    });
  }

  async function addTask() {
    if (!newTaskTitle.trim()) return;
    const newTask = await createTask(newTaskTitle);
    setTasks((prev) => [...prev, newTask]);
    setNewTaskTitle("");
  }

  async function handleDeleteTask(id: number) {
    setTasks((prev) => [...prev.filter((t) => t.id != id)]);
    await deleteTask(id);
  }

  async function handleUpdateTask(task: ITaskTable) {
    setTasks((prev) =>
      prev.map((innerTask) =>
        innerTask.id === task.id ? { ...task } : innerTask
      )
    );

    await updateTask({
      ...task,
    });
  }

  function handleCardClick(task: ITaskTable) {
    if (!dragging) setSelectedTask(task);
  }

  return (
    <DndContext onDragStart={() => setDragging(true)} onDragEnd={onDragEnd}>
      <TaskModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
        task={selectedTask!}
      />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
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
                <TaskCard
                  key={task.id}
                  task={task}
                  onClick={() => handleCardClick(task)}
                />
              ))}
          </TodoDroppableContainer>
        ))}
      </div>
    </DndContext>
  );
}
