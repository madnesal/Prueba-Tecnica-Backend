import { TaskRepository } from "../repositories/taskRepository.js";

export class DeleteTaskUseCase {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  deleteTask = async (id) => {
    try {
      const deleteTask = await this.taskRepository.deleteTask(id);

      if (!deleteTask.ok) {
        return { ok: false, status: 404, msg: deleteTask.msg };
      }

      return {
        ok: true,
        status: 200,
        msg: "Task deleted successfully",
        data: deleteTask.data,
      };
    } catch (error) {
      return { ok: false, status: 500, msg: error.message };
    }
  };
}
