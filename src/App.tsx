import CardShow from "./Component/CardShow";
import { useContext, useEffect, useState } from "react";
import ToDoListContext from "./context/context";

function App() {
  const context = useContext(ToDoListContext);
  if (!context) {
    throw new Error("ToDoListContext not found");
  }

  const {
    loadData,
    toDoLists,
    setToDoLists,
    onCreateToDoList,
    loading,
    error,
  } = context;

  useEffect(() => {
    loadData();
  }, []);

  const [title, setTitle] = useState("");
  const [descript, setDescript] = useState("");

  const handleDeleteAll = () => {
    setToDoLists([]);
  };

  const handleCreateToDoList = (title: string, descript: string) => {
    onCreateToDoList(title, descript);
    setTitle("");
    setDescript("");
  };

  const total = toDoLists.length;
  const done = toDoLists.filter((todo) => todo.finished).length;
  const percent = total === 0 ? 0 : ((done * 100) / total).toFixed(2);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#4682A9] px-4">
      <h1 className="text-3xl font-bold text-white mb-6">TO DO LIST</h1>
      <main className="w-full max-w-2xl bg-[#FFFBDE] px-8 py-10 rounded-2xl shadow-xl">
        {/* Add Content Section */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-row gap-4">
            <input
              value={title}
              type="text"
              placeholder="Add your title"
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 bg-white text-md border-black border-2 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
            />
            <button
              onClick={() => handleCreateToDoList(title, descript)}
              disabled={!title.trim()}
              className={`w-full sm:w-fit rounded-md px-5 py-2 font-semibold border-2 hidden sm:block
                ${
                  title.trim()
                    ? "bg-[#4682A9] text-white border-white hover:bg-[#91C8E4] hover:text-black"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                } transition-all duration-150`}
            >
              ADD
            </button>
          </div>

          <textarea
            value={descript}
            placeholder="Add your description (option)"
            onChange={(e) => setDescript(e.target.value)}
            rows={3}
            className="w-full bg-white text-md border-black border-2 rounded-md px-4 py-2 resize-none overflow-auto focus:outline-none focus:ring-2"
          />
          <button
            onClick={() => handleCreateToDoList(title, descript)}
            disabled={!title.trim()}
            className={`w-fit sm:w-fit rounded-md px-5 py-2 font-semibold border-2 block sm:hidden
                ${
                  title.trim()
                    ? "bg-[#4682A9] text-white border-white hover:bg-[#91C8E4] hover:text-black"
                    : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                } transition-all duration-150`}
          >
            ADD
          </button>

          <hr className="border-t-1 border-black" />

          {/* process section */}
          <section
            className={`flex flex-row flex-wrap ${
              toDoLists.length === 0 ? "hidden" : "flex"
            }`}
          >
            <div className="flex flex-row bg-[#91C8E4] px-2 rounded-xl w-fit py-1 font-bold text-sm">
              <span>
                you done {done} of {total} tasks ({percent}%)
              </span>
              <span className="ml-2 px-2 border-l-[1px] border-l-black">
                {percent === "0.00"
                  ? "start your task fighting!!"
                  : percent === "100.00"
                  ? "Great Job!! you did it!!"
                  : "keep going don't give up !!"}
              </span>
            </div>
            <span
              className="underline ml-0 sm:ml-auto sm:pt-0 pt-2 cursor-pointer hover:scale-105"
              onClick={() => handleDeleteAll()}
            >
              clear all
            </span>
          </section>

          {/* To do list section */}
          <section className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2 py-2">
            {loading && (
              <div className="flex flex-col w-full justify-center items-center">
                <span className="loader"></span>
                <span className="font-semibold mt-3">loading...</span>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center text-center text-red-500 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="red"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <span className="mt-2">Error please refresh to try again</span>
              </div>
            )}

            {!loading &&
              !error &&
              toDoLists.map((value) => (
                <CardShow
                  key={value.id}
                  id={value.id}
                  title={value.title}
                  description={value.description}
                  finished={value.finished}
                />
              ))}
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
