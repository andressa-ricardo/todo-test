import { useDroppable } from "@dnd-kit/core";

export function TodoDroppableContainer({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="min-h-[18rem] border rounded-sm p-2"
    >
      <h2 className="font-semibold mb-2">{id}</h2>
      {children}
    </div>
  );
}
