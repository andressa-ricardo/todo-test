import { createClient } from "@/utils/supabase/server";
import { ITaskTable } from "./ITaskTable";

// Atualiza uma tarefa
export async function updateTask(taskData: {
  id: ITaskTable["id"];
  userId: ITaskTable["user_id"];
  status?: ITaskTable["status"];
  startTime?: ITaskTable["start_time"];
  endTime?: ITaskTable["end_time"];
}): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({
      status: taskData.status,
      start_time: taskData.startTime,
      end_time: taskData.endTime,
    })
    .eq("id", taskData.id)
    .eq("user_id", taskData.userId);

  if (error) throw new Error("Erro ao atualizar a tarefa: " + error.message);
}

// Deleta uma tarefa
export async function deleteTask(taskData: {
  userId: ITaskTable["user_id"];
  taskId: ITaskTable["id"];
}): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskData.taskId)
    .eq("user_id", taskData.userId);

  if (error) {
    throw new Error("Erro ao deletar a tarefa: " + error.message);
  }
}

// Busca uma tarefa específica
export async function findTask(taskData: {
  userId: ITaskTable["user_id"];
  taskId: ITaskTable["id"];
}): Promise<ITaskTable | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskData.taskId)
    .eq("user_id", taskData.userId)
    .single();

  if (error) return null;

  return data as ITaskTable;
}

// Coletar tasks do usuário
export async function getTasks(where: {
  userId: ITaskTable["user_id"];
}): Promise<ITaskTable[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", where.userId)
    .order("created_at", { ascending: true });

  console.log({ data, error, where });

  if (error) {
    console.error("Erro ao buscar tasks:", error.message);
    return [];
  }

  return data || [];
}
