// app/api/tasks/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { updateTask, deleteTask, findTask } from "@/lib/task";
import { createClient } from "@/utils/supabase/server";

// Atualiza a tarefa a partir de seu ID
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const params = await context.params;

  if (!params?.id) {
    return NextResponse.json({ error: "ID é obrigatório" }, { status: 400 });
  }

  const { id } = params;
  const updateData = await req.json();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: userId } = user;

  const task = await findTask({
    id: Number(id),
    user_id: userId,
  });

  if (!task) {
    return NextResponse.json({ error: "Task não encontrada" }, { status: 404 });
  }

  await updateTask({
    ...task,
    ...updateData,
  });

  return NextResponse.json({ message: "Tarefa atualizada", task });
}

// Deleta a tarefa a partir de seu ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: userId } = user;

  const task = await findTask({
    id: Number(id),
    user_id: userId,
  });

  if (!task)
    return NextResponse.json({ error: "Task não encontrada" }, { status: 404 });

  await deleteTask({
    id: Number(id),
    user_id: userId,
  });

  return NextResponse.json({ message: "Tarefa deletada!" });
}
