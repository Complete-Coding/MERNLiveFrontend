import { TodoItemsContext } from "../store/TodoItemsContext";
import { todoItemToClientModel } from "../utils/ModelUtil";
import { useRef, useContext } from "react";

const AddTodo = () => {
  const todoTextInput = useRef();
  const todoDateInput = useRef();
  const { addTodoItem } = useContext(TodoItemsContext);

  const addHandler = () => {
    const todoText = todoTextInput.current.value;
    const todoDate = todoDateInput.current.value;

    if (!todoText || !todoDate) return;

    todoTextInput.current.value = "";
    todoDateInput.current.value = "";

    fetch("http://mern-live-backend.azurewebsites.net/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: todoText, date: todoDate }),
    })
      .then((res) => res.json())
      .then((serverItem) => {
        const { id, todoText, todoDate } = todoItemToClientModel(serverItem);
        addTodoItem(id, todoText, todoDate);
      });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="What needs to be done?"
          ref={todoTextInput}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="date"
          ref={todoDateInput}
          className="sm:w-40 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addHandler}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
