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
    <div className="w-full">
      <h1 className="text-4xl font-bold text-center mb-6 sm:text-5xl md:text-6xl">
        Todo-app
      </h1>

      <div className="w-full max-w-4xl mx-auto">
        <TodoApp />
      </div>
    </div>
  );
}
