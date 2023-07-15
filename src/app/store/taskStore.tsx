import { types } from "mobx-state-tree";
import { useEffect } from "react";

const Task = types
  .model("Task", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    status: types.string,
  })
  .actions((self) => ({
    updateStatus(newStatus: string) {
      self.status = newStatus;
    },
  }));

const TaskStore = types
  .model("TaskStore", {
    tasks: types.array(Task),
  })
  .actions((self) => ({
    addTask(taskData: { title: string; description: string; status: string }) {
      const newTask = Task.create({
        id: String(Date.now()),
        ...taskData,
      });
      self.tasks.push(newTask);
    },
    deleteTask(taskId: string) {
      const taskIndex = self.tasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        self.tasks.splice(taskIndex, 1);
      }
    },
    loadTask(
      prevTask: {
        id: string;
        title: string;
        description: string;
        status: string;
      }[]
    ) {
      self.tasks.push(...prevTask);
    },
  }));

export default TaskStore;
