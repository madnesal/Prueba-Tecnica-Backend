import MainBaseValidations from "../../../shared/mainBaseValidations.js";
import { TaskRepository } from "../repositories/taskRepository.js";

export class CreateTaskUseCase {
  constructor() {
    this.taskRepository = new TaskRepository();
  }

  createTask = async (task) => {
    try {
      const createTask = MainBaseValidations.handleResult(
        await this.taskRepository.insertTask(task),
      );

      return {
        ok: true,
        status: 201,
        msg: "Task created successfully",
        data: createTask.data,
      };
    } catch (error) {
      return { ok: false, status: 500, msg: error.message };
    }
  };
}
