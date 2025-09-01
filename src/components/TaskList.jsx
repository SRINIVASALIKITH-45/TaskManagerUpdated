import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdate, onDelete, onToggleDone }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggleDone={onToggleDone}
        />
      ))}
    </div>
  );
}

export default TaskList;
