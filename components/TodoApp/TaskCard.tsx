import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: { id: string; title: string; status: string };
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "unique-id",
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      className="border p-3 shadow-md rounded-md mb-2 cursor-grab bg-slate-100"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <p className="text-sm font-medium text-black">{task.title}</p>
    </div>
  );
}
