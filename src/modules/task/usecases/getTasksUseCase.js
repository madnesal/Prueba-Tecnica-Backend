import MainBaseValidations from "../../../shared/mainBaseValidations.js";
import { TaskRepository } from "../repositories/taskRepository.js";

export class GetTasksUseCase {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  getTasks = async () => {
    try {
      const getTasks = MainBaseValidations.handleResult(
        await this.taskRepository.getTasks(),
      );

      if (getTasks.ok && getTasks.data.length === 0) {
        return { ok: false, status: 404, msg: "No tasks found" };
      }

      return {
        ok: true,
        status: 200,
        msg: "Tasks obtained successfully",
        data: getTasks.data,
      };
    } catch (error) {
      return { ok: false, status: 500, msg: error.message };
    }
  };
}
