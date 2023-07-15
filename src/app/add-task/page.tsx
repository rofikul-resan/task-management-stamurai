"use client";

import { log } from "console";
import React, { useState } from "react";
import { Puff, RotatingLines } from "react-loader-spinner";

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleAddTask = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const form = event.target;
    const name: string = form.name.value;
    console.log(name);
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
