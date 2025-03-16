import { TodoApp } from "@/components/TodoApp";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Todo-app</h1>
      <TodoApp />
    </div>
  );
}
