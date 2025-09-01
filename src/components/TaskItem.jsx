import React, { useState } from "react";

function TaskItem({ task, onUpdate, onDelete, onToggleDone }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDesc, setNewDesc] = useState(task.description);

  const handleSave = () => {
    onUpdate(task._id, {
      ...task,
      title: newTitle,
      description: newDesc,
    });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "done" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          ></textarea>
          <button onClick={handleSave}>💾 Save</button>
          <button onClick={() => setIsEditing(false)}>❌ Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <div className="task-buttons">
            <button onClick={() => setIsEditing(true)}>✏️ update</button>
            <button onClick={() => onToggleDone(task._id, !task.completed)}>
              {task.completed ? "✅ Undone" : "✔️ Done"}
            </button>
            <button onClick={() => onDelete(task._id)}>🗑️ Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
