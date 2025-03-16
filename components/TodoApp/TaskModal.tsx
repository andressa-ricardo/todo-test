import { ITaskTable } from "@/lib/task/ITaskTable";
import { useEffect, useState } from "react";

export function TaskModal({
  isOpen,
  task,
  onClose,
  onDelete,
  onUpdate,
}: {
  task: ITaskTable;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: ITaskTable["id"]) => void;
  onUpdate: (task: ITaskTable) => void;
}) {
  const [innerTitle, setInnerTitle] = useState(task?.title || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    task && setInnerTitle(task.title);
  }, [task]);

  useEffect(() => {
    if (isEditing && innerTitle == task.title) return;

    onClose();
    onUpdate({
      ...task,
      title: innerTitle,
    });
  }, [isEditing]);

  if (!isOpen) return <></>;

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-background border rounded shadow-md p-6 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              type="text"
              value={innerTitle}
              onChange={(e) => setInnerTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              autoFocus
            />
          ) : (
            <h2 className="text-xl font-bold mb-4">{innerTitle}</h2>
          )}

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isEditing ? "Salvar" : "Editar"}
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              onClose();
              onDelete(task.id);
            }}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Deletar
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
