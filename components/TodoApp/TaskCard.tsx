import { ITaskTable } from "@/lib/task/ITaskTable";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export function TaskCard({
  id,
  children,
}: {
  id: ITaskTable["id"];
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-blue-500 text-white p-2 rounded mb-2 cursor-grab relative"
    >
      {children}
    </button>
  );
}
