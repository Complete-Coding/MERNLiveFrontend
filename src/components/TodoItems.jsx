import { TodoItemsContext } from "../store/TodoItemsContext";
import TodoItem from "./TodoItem";
import { useContext } from "react";

const TodoItems = () => {
  const { todoItems } = useContext(TodoItemsContext);
  console.log(todoItems);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        {todoItems.map((item) => (
          <TodoItem 
            key={item.id} 
            id={item.id} 
            todoText={item.todoText} 
            todoDate={item.todoDate}
            completed={item.completed}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoItems;
