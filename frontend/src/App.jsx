import { useEffect, useState } from "react";
import axiosClient from "./api/axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await axiosClient.get("/todos");
    setTodos(data);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/todos", { title });
      console.log("Success:", response.data);
      setTitle("");
      fetchTodos();
    } catch (error) {
      if (error.response) {
        // The server responded with a status code outside 2xx
        console.error("Backend Error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received (CORS/Server Down)
        console.error(
          "Network Error: Is the Laravel server running at http://127.0.0.1:8000?",
        );
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const toggleTodo = async (todo) => {
    await axiosClient.put(`/todos/${todo.id}`, {
      is_completed: !todo.is_completed,
    });
    fetchTodos();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Laravel + React Todo</h1>
        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            className="border p-2 flex-grow"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Add here Bro
          </button>
        </form>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border-b py-2"
            >
              <span className={todo.is_completed ? "line-through" : ""}>
                {todo.title}
              </span>
              <input
                type="checkbox"
                checked={todo.is_completed}
                onChange={() => toggleTodo(todo)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
