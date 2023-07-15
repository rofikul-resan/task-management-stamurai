"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Task {
  name: string;
  description: string;
  id: string;
  status: string;
}

export default function Home(): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const taskData = localStorage.getItem("taskMG");
    if (!taskData) {
      localStorage.setItem("taskMG", JSON.stringify([]));
    } else {
      setTasks(JSON.parse(taskData));
    }
  }, []);

  const handleUpdateStatus = (status: string, id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem("taskMG", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const remainTasks = tasks.filter((task) => task.id !== id);
        localStorage.setItem("taskMG", JSON.stringify(remainTasks));
        setTasks(remainTasks);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <main>
      <div className="grid grid-cols-3 gap-5 my-6 md:w-10/12 mx-auto">
        {tasks.map((task) => (
          <div key={task.id} className="card p-6 bg-base-300 space-y-4">
            <h2 className="text-xl font-semibold">Task Name: {task.name}</h2>
            <p>
              Status: <span className="font-semibold">{task.status}</span>
            </p>
            <p>Description: {task.description}</p>
            {task.status === "toDo" && (
              <button
                className="btn btn-primary"
                onClick={() => handleUpdateStatus("progress", task.id)}
              >
                In Progress
              </button>
            )}
            {task.status === "progress" && (
              <button
                className="btn btn-primary"
                onClick={() => handleUpdateStatus("completed", task.id)}
              >
                Complete
              </button>
            )}
            {task.status === "completed" && (
              <button className="btn btn-primary" disabled>
                Completed
              </button>
            )}
            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-warning"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
