import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";

interface ColumnProps {
  status: string;
  tasks: { id: string; title: string; status: string }[];
}

export function Column({ status, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="border p-4 rounded-md min-h-[400px]" ref={setNodeRef}>
      <h2 className="text-lg font-semibold mb-3">{status}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
