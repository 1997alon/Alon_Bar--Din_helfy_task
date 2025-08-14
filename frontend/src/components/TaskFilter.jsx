import React from "react";

export default function TaskFilter({ filter, setFilter }) {
    return (
        <div className="filtertask">
            <span>Filter: </span>
            <button onClick={() => setFilter("all")}
            disabled={filter === "all"}
            >
                All
            </button>
            <button onClick={() => setFilter("completed")}
            disabled={filter === "completed"}
            >
                Completed
            </button>
            <button onClick={() => setFilter("pending")}
            disabled={filter === "pending"}
            >
                Pending
            </button>
        </div>
    )
}