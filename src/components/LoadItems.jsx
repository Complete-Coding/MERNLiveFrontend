import { useContext } from "react";
import { TodoItemsContext } from "../store/TodoItemsContext";
import { useEffect } from "react";
import { useState } from "react";
import { todoItemToClientModel } from "../utils/ModelUtil";

const LoadItems = () => {
  const { todoItems, addAllTodoItems } = useContext(TodoItemsContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://mern-live-backend.azurewebsites.net/todos")
      .then((res) => res.json())
      .then((items) => {
        const newItems = items.map(todoItemToClientModel);
        addAllTodoItems(newItems);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {!isLoading && todoItems.length === 0 && (
        <div className="text-center text-gray-600">
          <p className="text-lg">No tasks - enjoy your day!</p>
        </div>
      )}
    </div>
  );
};

export default LoadItems;
