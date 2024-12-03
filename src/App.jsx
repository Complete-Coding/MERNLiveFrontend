import AddTodo from "./components/AddTodo";
import LoadItems from "./components/LoadItems";
import TodoItems from "./components/TodoItems";
import { TodoItemsProvider } from "./store/TodoItemsContext";

function App() {
  return (
    <TodoItemsProvider>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Todo App
          </h1>
          <AddTodo />
          <LoadItems />
          <TodoItems />
        </div>
      </div>
    </TodoItemsProvider>
  );
}

export default App;
