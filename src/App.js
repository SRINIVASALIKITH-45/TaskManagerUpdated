import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async (task) => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const newTask = await res.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Update Task
  const updateTask = async (id, updatedTask) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      const data = await res.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? data : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Toggle Done
  const toggleDone = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      const data = await res.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? data : task))
      );
    } catch (err) {
      console.error("Error marking task done:", err);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, { method: "DELETE" });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="app-container">
      <h1>📌 Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <TaskList
        tasks={tasks}
        onUpdate={updateTask}
        onToggleDone={toggleDone}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;
