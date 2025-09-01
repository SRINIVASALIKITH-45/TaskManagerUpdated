import React, { useState } from "react";


function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return; // don't allow empty title

    const newTask = {
      title,
      description,
      completed: false,
    };

    onAdd(newTask); // call parent function to add task

    // reset form
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">➕ Add Task</button>
    </form>
  );
}

export default TaskForm;
