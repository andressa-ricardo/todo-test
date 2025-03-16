import { createClient } from "@/utils/supabase/server";
import {
  ITaskTable,
  ITaskTableValidate,
  ITaskTableUpdate,
  ITaskTableQuery,
  ITaskTableInsert,
} from "./ITaskTable";

// Atualiza uma tarefa
export async function updateTask(taskData: ITaskTableUpdate): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({
      status: taskData.status,
      start_time: taskData.start_time,
      end_time: taskData.end_time,
      title: taskData.title,
    })
    .eq("id", taskData.id)
    .eq("user_id", taskData.user_id);

  if (error) throw new Error("Erro ao atualizar a tarefa: " + error.message);
}

// Deleta uma tarefa
export async function deleteTask(taskData: ITaskTableValidate): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskData.id)
    .eq("user_id", taskData.user_id);

  if (error) {
    throw new Error("Erro ao deletar a tarefa: " + error.message);
  }
}

// Busca uma tarefa específica
export async function findTask(
  taskData: ITaskTableValidate
): Promise<ITaskTable | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskData.id)
    .eq("user_id", taskData.user_id)
    .single();

  if (error) return null;

  return data as ITaskTable;
}

// Coletar tasks do usuário
export async function getTasks(where: ITaskTableQuery): Promise<ITaskTable[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", where.user_id)
    .order("created_at", { ascending: true });

  console.log({ data, error, where });

  if (error) {
    console.error("Erro ao buscar tasks:", error.message);
    return [];
  }

  return data || [];
}

// Cria uma task para o usuário
export async function createTask({
  title,
  user_id,
}: ITaskTableInsert): Promise<ITaskTable | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tasks")
    .insert({ title, user_id })
    .select()
    .single(); // Retorna apenas um objeto

  if (error) {
    console.error("Erro ao criar task:", error);
    return null;
  }

  return data;
}
