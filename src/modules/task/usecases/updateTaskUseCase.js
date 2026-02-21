import { TaskRepository } from "../repositories/taskRepository.js";

export class UpdateTaskUseCase {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  updateTask = async (task) => {
    try {
      const updateTask = await this.taskRepository.updateTask(task);

      if (!updateTask.ok) {
        return { ok: false, status: 404, msg: updateTask.msg };
      }

      return {
        ok: true,
        status: 200,
        msg: "Task updated successfully",
        data: updateTask.data,
      };
    } catch (error) {
      return { ok: false, status: 500, msg: error.message };
    }
  };
}
