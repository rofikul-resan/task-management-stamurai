"use client";
import { string } from "mobx-state-tree/dist/internal";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<[]>([]);
  useEffect(() => {
    const taskData = localStorage.getItem("taskMG");
    if (!taskData) {
      localStorage.setItem("taskMG", JSON.stringify([]));
    } else {
      setTasks(JSON.parse(taskData));
    }
  }, []);

  const handleUpdateStatus = (status: string, id: string) => {
    const targetTask = tasks.find((task) => task.id === id);
    const remain = tasks.filter((task) => task.id !== id);
    targetTask.status = status;
    const updateAllTasks = [...remain, targetTask];
    updateAllTasks.sort((a, b) => a.id - b.id);
    setTasks(updateAllTasks);
    localStorage.setItem("taskMG", JSON.stringify(updateAllTasks));
    console.log(targetTask, remain);
  };

  const deleteTask = (id: string) => {
    console.log(id);

    const remainTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("taskMG", JSON.stringify(remainTasks));
    setTasks(remainTasks);
  };
  return (
    <main>
      <div className="grid grid-cols-3 gap-5 my-6 md:w-10/12 mx-auto">
        {tasks.map(
          (task: {
            name: string;
            description: string;
            id: string;
            status: string;
          }) => (
            <div key={task.id} className="card p-6 bg-base-300 space-y-4">
              <h2 className="text-xl font-semibold">Task Name : {task.name}</h2>
              <p>
                Status : <span className="font-semibold">{task.status}</span>
              </p>
              <p>Description : {task.description}</p>
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
          )
        )}
      </div>
    </main>
  );
}
