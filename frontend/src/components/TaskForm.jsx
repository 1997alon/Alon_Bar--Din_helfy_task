import { useState } from "react";

export default function TaskForm({ onSubmit, data }) {
    const [title, setTitle] = useState(data?.title || "");
    const [description, setDescription] = useState(data?.description || "");
    const [priority, setPriority] = useState(data?.priority || "low");
    const handleSumbit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Ttile cannot be empty");
            return;
        }

        onSubmit({ 
            id: data?.id,
            title: title.trim(), // for nicer view
            description,
            priority, 
        });
        setTitle("");
        setDescription("");
        setPriority("low");
    };


    return (
        <div className="taskform">
            <form onSubmit={handleSumbit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                />
                <input
                    type="text"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required 
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    )


}