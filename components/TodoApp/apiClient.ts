import { ITaskTable } from "@/lib/task/ITaskTable";

// Função para buscar as tasks da API
export async function fetchTasks(): Promise<ITaskTable[]> {
  const res = await fetch("/api/tasks");
  const { data } = await res.json();
  return data;
}

// Função para criar uma nova task
export async function createTask(title: string) {
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const data = await res.json();

  return data.task;
}

// Função para atualizar o status da task
export async function updateTask(task: ITaskTable) {
  await fetch(`/api/tasks/${task.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task }),
  });
}

// Função para deletar uma task
export async function deleteTask(id: number) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
}
