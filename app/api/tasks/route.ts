// app/api/tasks/route.ts

import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { getTasks } from "@/lib/task";

// Coletar todas as tasks do usuário
export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: userId } = user;

  const taskArr = await getTasks({ userId: userId });

  return NextResponse.json({ data: taskArr });
}