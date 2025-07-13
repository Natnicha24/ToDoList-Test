import { useContext, useState } from "react";
import CardEdit from "./CardEdit";
import ToDoListContext from "../context/context";

interface CardProps {
  id: number;
  title: string;
  description: string;
  finished: boolean;
}

function Card({ id, title, description}: CardProps) {
  const context = useContext(ToDoListContext);
  if (!context) {
    throw new Error("ToDoListContext not found");
  }

  const [isToggled, setIsToggled] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { onDelete,onChangeStatus } = context;

  const handleToggle = (id:number) => {
    onChangeStatus(id,!isToggled)
    setIsToggled(!isToggled);
  };

  return (
    <div className="w-full max-w-full shadow-lg bg-white rounded-md px-5 py-4 flex items-center gap-4">
      {!showEdit ? (
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-lg font-semibold text-gray-800">{title}</span>
            <span
              className={`text-sm p-0 ${
                isToggled ? "text-green-600" : "text-red-600"
              }`}
            >
              {isToggled ? "done" : "not done"}
            </span>
          </div>
          <span className="text-gray-500 text-sm mt-1">{description}</span>
        </div>
      ) : (
        <CardEdit id={id} title={title} description={description} setShowEdit={setShowEdit} />
      )}

      {/* right section */}
      <div className="flex items-center ml-auto gap-4">
        <div className="flex flex-col items-end">
          <button
            onClick={()=>handleToggle(id)}
            className={`w-12 h-6 mt-1 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              isToggled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                isToggled ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>

        {/* Edit*/}
        {!showEdit && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-600 hover:text-blue-600 cursor-pointer transition-colors"
            onClick={() => setShowEdit(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        )}

        {/*Delete*/}
        <svg
          onClick={() => onDelete(id)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600 hover:text-red-600 cursor-pointer transition-colors"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
}

export default Card;
