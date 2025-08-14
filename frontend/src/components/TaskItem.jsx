import React, { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskItem({ task, onDelete, onToggle, onUpdate }) {
    const priorityColor = {
        low: "green",
        medium: "orange",
        high: "red",
    };
    const [showForm, setShowForm] = useState(false);

    return (
        <tr style={{ backgroundColor: task.completed ? "#e0ffe0" : "#fff"}}>
            <td style={{ border: "1px sold #ccc", padding: "8px "}}>{task.title}</td>
            <td style={{ border: "1px sold #ccc", padding: "8px "}}>{task.description}</td>
            <td style={{ border: "1px sold #ccc", padding: "8px "}}>{task.completed ? "Completed" : "Pending"}</td>
            <td style={{ border: "1px sold #ccc", padding: "8px "}}>{new Date(task.createdAt).toLocaleString()}</td>
            <td style={{ border: "1px sold #ccc", padding: "8px "}}>
                <span
                    style={{ backgroundColor: priorityColor[task.priority], color: "white", padding: "2px 6px", borderRadius: "4px" }}>
                        {task.priority}
                </span>
            </td>
            <td style={{ border: "1px sold #ccc", padding: "8px "}}>
                <button onClick={() => onToggle(task.id)}>
                    {task.completed ? "Mark Pending" : "Mark Completed"}
                </button>
                {!showForm && <button onClick={() => setShowForm(true)}>Update</button>}
                {showForm && <TaskForm data={task} onSubmit={onUpdate}/>}
                {showForm && (
                <>
                    <button onClick={() => setShowForm(false)}>Cancel Updating</button>
                    <br />
                </>)}
                <button onClick={() => onDelete(task.id)}>Delete</button>
            </td>
        </tr>
     
    )
}