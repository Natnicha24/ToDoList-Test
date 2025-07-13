import { createContext, ReactNode } from "react";
import { useState } from "react";

interface TodoList {
  id: number;
  title: string;
  description: string;
  finished: boolean;
}

interface toDoContextType {
  loadData: () => void;
  toDoLists: TodoList[];
  setToDoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  onCreateToDoList: (title:string,description:string) => void;
  onDelete: (id: number) => void;
  onEdit: (title: string, description: string, id: number) => void;
  onChangeStatus: (id: number, finished: boolean) => void;
  loading: boolean;
  error: string | null;
}

const ToDoListContext = createContext<toDoContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [toDoLists, setToDoLists] = useState<TodoList[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );

      if (!response.ok) {
        throw new Error("Error from response is not ok");
      }

      const data:TodoList[] = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 1500)); //for test and show loading
      console.log("Success:", data);
      setToDoLists(data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message || "Error from fetch response fail");
    } finally {
      setLoading(false);
    }
  };

  const onCreateToDoList = (title:string,description:string) => {
    const newToDo:TodoList = {
      id: Date.now(),
      title: title,
      description: description,
      finished: false,
    };
    setToDoLists([...toDoLists, newToDo]);
  };

  const onDelete = (id: number) => {
    const updateToDoList = toDoLists.filter((todolist) => {
      return todolist.id !== id;
    });

    setToDoLists(updateToDoList);
  };

  const onEdit = async (title: string, description: string, id: number) => {
    const updateToDoList = toDoLists.map((todolist) => {
      if (todolist.id === id) {
        return { ...todolist, title: title, description: description };
      }
      return todolist;
    });

    setToDoLists(updateToDoList);
  };

  const onChangeStatus = (id: number, finished: boolean) => {
    const updateToDoList = toDoLists.map((todolist) => {
      if (todolist.id === id) {
        return { ...todolist, finished: finished };
      }
      return todolist;
    });

    setToDoLists(updateToDoList);
  };

  const valueToShare: toDoContextType = {
    loadData,
    toDoLists,
    setToDoLists,
    onCreateToDoList,
    onDelete,
    onEdit,
    onChangeStatus,
    loading,
    error,
  };

  return (
    <ToDoListContext.Provider value={valueToShare}>
      {children}
    </ToDoListContext.Provider>
  );
}

export { Provider };
export default ToDoListContext;
