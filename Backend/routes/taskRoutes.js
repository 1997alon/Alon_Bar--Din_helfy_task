const express = require('express');
const router = express.Router();


let tasks = [];
let idCounter = 1;

router.get("/", (req, res) => {
    res.json(tasks);
});

router.post("/", (req, res) => {
    const { title, description, priority } = req.body;
    let b = true;
    const error = validateTask({ title, description, priority, b });
    if (error) {
        return res.status(400).json({ error });
    }

    const newTask = {
        id: idCounter,
        title, 
        description: description,
        completed: false,
        createdAt: new Date(),
        priority
    }
    idCounter++;
    tasks.push(newTask);
    res.status(201).json(newTask);
});


router.put("/:id", (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Task not found" }); 

    const { title, description, completed, priority } = req.body;

    const error = validateTask({ title, description, priority, completed });
    if (error) {
        return res.status(400).json({ error });
    }

    const updateTask = {
        id: tasks[index].id,
        title,
        description, 
        completed,
        priority,
        createdAt: tasks[index].createdAt
    };

    tasks[index] = updateTask;
    res.json(updateTask);
});

router.delete("/:id", (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" }); 

    tasks = tasks.filter(t => t.id !== task.id);
    res.status(204).send();
});


router.patch("/:id/toggle", (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));
    if (!task) return res.status(404).json({ error: "Task not found" }); 

    task.completed = !task.completed;
    res.json(task);
});


function validateTask({ title, description, priority, completed }) {
    if (title === undefined || !title || typeof title !== "string" || !title.trim()) {
        return "Ttile is require here";
    }
    if (description === undefined || !description || typeof description !== "string") {
        return "Description must be a string and not null";
    }
    if (priority !== "low" && priority !== "medium" && priority !== "high") {
         return "Prioriry is not valid";
    }
    if (completed !== undefined && typeof completed !== "boolean") {
        return "completed is not boolean";
    }
    return null;

}

module.exports = router;