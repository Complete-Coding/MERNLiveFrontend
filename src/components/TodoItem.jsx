import { TodoItemsContext } from "../store/TodoItemsContext";
import { useContext, useState } from "react";

const TodoItem = ({ id, todoText, todoDate, completed }) => {
  const { deleteTodoItem } = useContext(TodoItemsContext);
  const [isComplete, setIsComplete] = useState(completed);

  const deleteHandler = () => {
    fetch(`//mern-live-backend.azurewebsites.net/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        deleteTodoItem(data.id);
      })
      .catch((err) => console.log(err));
  };

  const toggleComplete = () => {
    fetch(`//mern-live-backend.azurewebsites.net/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !isComplete }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsComplete(data.completed);
      })
      .catch((err) => console.log(err));
  };

  const formattedDate = new Date(todoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="group flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={isComplete}
          onChange={toggleComplete}
          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div
          className={`flex flex-col ${
            isComplete ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          <span className="font-medium">{todoText}</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
      </div>
      <button
        onClick={deleteHandler}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
        title="Delete item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
