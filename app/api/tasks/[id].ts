// app/api/tasks/[id].ts

import { NextRequest, NextResponse } from "next/server";
import { updateTask, deleteTask, findTask } from "@/lib/task";
import { createClient } from "@/utils/supabase/server";

// Atualiza a tarefa a partir de seu ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { status, start_time, end_time } = await req.json();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: userId } = user;

  const task = await findTask({
    taskId: id,
    userId: userId,
  });

  if (!task)
    return NextResponse.json({ error: "Task não encontrada" }, { status: 404 });

  if (start_time == undefined && end_time == undefined && status == undefined)
    return NextResponse.json({ message: "Tarefa atualizada", task });

  await updateTask({
    id: task.id,
    userId: userId,
    status: status,
    endTime: end_time,
    startTime: start_time,
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
    taskId: id,
    userId: userId,
  });

  if (!task)
    return NextResponse.json({ error: "Task não encontrada" }, { status: 404 });

  await deleteTask({
    taskId: id,
    userId: userId,
  });

  return NextResponse.json({ message: "Tarefa deletada!" });
}
