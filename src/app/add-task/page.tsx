"use client";
import React, { useState } from "react";
import { Puff, RotatingLines } from "react-loader-spinner";
import TaskStore from "../store/taskStore";
import { getSnapshot } from "mobx-state-tree";
import Swal from "sweetalert2";

const page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddTask = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const taskData = localStorage.getItem("taskMG");
    if (!taskData) {
      localStorage.setItem("taskMG", JSON.stringify([]));
    }
    const preTask = localStorage.getItem("taskMG");
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const nameInput = form.elements.namedItem("name") as HTMLInputElement;
    const name: string = nameInput.value;
    const statusInput = form.elements.namedItem("status") as HTMLSelectElement;
    const status: string = statusInput.value;
    const descriptionInput = form.elements.namedItem(
      "description"
    ) as HTMLTextAreaElement;
    const description: string = descriptionInput.value;
    const newTask = { name, status, description, id: String(Date.now()) };
    const preTaskArr = JSON.parse(preTask || "[]");
    const alltask = [...preTaskArr, newTask];

    localStorage.setItem("taskMG", JSON.stringify(alltask));
    setTimeout(() => {
      setLoading(false);
      form.reset();
      Swal.fire({
        icon: "success",
        title: "Task add Successful",
      });
    }, 500);
  };
  return (
    <div>
      <h1 className="text-center mt-6 text-4xl font-semibold">Add task</h1>
      <form
        onSubmit={handleAddTask}
        className="w-8/12 mx-auto bg-base-300 p-10 mt-8 rounded-md"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="text-xl font-semibold italic">Name</span>
            </label>
            <input
              type="text"
              placeholder="Task Name"
              name="name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="text-xl font-semibold italic">Status</span>
            </label>
            <select
              placeholder="Task Status"
              name="status"
              className="input input-bordered"
              required
            >
              <option value="toDo"> Todo</option>
              <option value="progress"> In Progress</option>
              <option value="completed"> Completed</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">
            <span className="text-xl font-semibold italic">Description</span>
          </label>
          <textarea
            placeholder="Description"
            name="description"
            className="input input-bordered h-20 p-4 w-full resize-none"
            required
          />
        </div>
        <div className="form-control">
          <button className="btn btn-primary btn-block mt-6 gap-4">
            <span>Add Text</span>
            <span>
              <RotatingLines
                strokeColor="black"
                strokeWidth="5"
                animationDuration="0.75"
                width="25"
                visible={loading}
              />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
