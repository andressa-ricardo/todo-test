import { ITaskTable } from "@/lib/task/ITaskTable";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { MouseEventHandler } from "react";

export function TaskCard({
  onClick,
  task,
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  task: ITaskTable;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: { ...task },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-blue-500 text-white p-2 rounded mb-2 cursor-grab relative w-full text-wrap text-center h-auto break-words"
      onClick={onClick || (() => {})}
    >
      {task.title}
    </button>
  );
}
