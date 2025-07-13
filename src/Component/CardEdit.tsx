import { useContext, useState } from "react";
import ToDoListContext from "../context/context";

interface CardEditProps {
  id: number;
  title: string;
  description: string;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>
}

function CardEdit({ id, title, description, setShowEdit }: CardEditProps) {
  const context = useContext(ToDoListContext);
  if (!context) {
    throw new Error("ToDoListContext not found");
  }

  const [newTitle, setNewTitle] = useState(title);
  const [newDescript, setNewDescript] = useState(description);
  const { onEdit } = context;

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(newTitle, newDescript, id);
    setShowEdit(false);
  };

  return (
    <form
      className="w-full max-w-full bg-white rounded-md px-5 py-4 flex items-center gap-4"
      onSubmit={handleSubmitForm}
    >
      <div className="flex flex-col gap-2 w-full">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          type="text"
          className="flex-1 bg-white text-md border-black border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
        />
        <textarea
          value={newDescript}
          onChange={(e) => setNewDescript(e.target.value)}
          placeholder="Add your description"
          rows={3}
          className="w-full bg-white text-md border-black border-2 rounded-md px-4 py-2 resize-none overflow-auto focus:outline-none focus:ring-2"
        />
        <button
          type="submit"
          className="w-fit px-3 py-2 bg-green-600 text-white font-bold text-md shadow-md hover:scale-105 transition-transform duration-150 rounded-md"
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export default CardEdit;
