import './style/App.css';
import { useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, toggleTask, updateTask } from './services/taskService';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [editingTaskId, Id] = useState(null);

  const [error, setError] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
  });
  
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
      setError(null);
    } catch (er) {
      setError("Failed to fetch");
      console.error(er);
    }
  };

  const handleAddTask = async (task) => {
    try {
      await createTask(task);
      fetchTasks();
      setError(null);
    } catch (er) {
      setError(er.response?.data?.error || "Falied to create task");
    }
  };
  

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
      setError(null);
    } catch (er) {
      setError(er.response?.data?.error || "Falied to delete task");
    }
  };

  const handleToggleTask = async (id) => {
    try {
      await toggleTask(id);
      fetchTasks();
      setError(null);
    } catch (er) {
      setError(er.response?.data?.error || "Falied to toggle task");
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      await updateTask(task.id, task);
      fetchTasks();
      setError(null);
    } catch (er) {
      setError(er.response?.data?.error || "Falied to update task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };
  useEffect(() => {
    fetchTasks();
  }, [])


  return (
    <div className="App">
      <h1>Task Manager</h1>
      {showForm && <TaskForm onSubmit={handleAddTask} />}
      {!showForm && <button onClick={() => setShowForm(true)}>Add Task</button>}
      {showForm && <button onClick={() => setShowForm(false)}>Cancel</button>}
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList 
        tasks={filteredTasks} 
        onDelete={handleDeleteTask} 
        onUpdate={handleUpdateTask} 
        onToggle={handleToggleTask}
        />
    </div>
  );
}

export default App;
