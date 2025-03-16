// app/api/tasks/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { createTask, getTasks } from "@/lib/task";

// Coletar todas as tasks do usuário
export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: userId } = user;
  const taskArr = await getTasks({ user_id: userId });

  return NextResponse.json({ data: taskArr });
}

// Atualiza a tarefa a partir de seu ID
export async function POST(req: NextRequest) {
  const { title } = await req.json();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: userId } = user;

  const task = await createTask({ title, user_id: userId });

  return NextResponse.json({ message: "Tarefa criada com sucesso!", task });
}
