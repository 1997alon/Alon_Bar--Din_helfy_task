import React from "react";
import TaskItem from "./TaskItem";


export default function TaskList({ tasks = [], onDelete, onToggle, onUpdate }) {
    if (tasks.length === 0) return <p>No tasks</p>

    return (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px"}}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid #ccc", padding: "8px"}}>Title</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px"}}>Description</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px"}}>Completed</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px"}}>Created At</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px"}}>Priority</th>
                    <th style={{ border: "1px solid #ccc", padding: "8px"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onDelete={onDelete} onToggle={onToggle} onUpdate={onUpdate} />
                ))}
            </tbody>
        </table>
    )
}