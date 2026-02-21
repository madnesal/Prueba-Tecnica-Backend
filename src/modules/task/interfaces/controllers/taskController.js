import { GetTasksUseCase } from "../../usecases/getTasksUseCase.js";
import { CreateTaskUseCase } from "../../usecases/createTaskUseCase.js";
import { UpdateTaskUseCase } from "../../usecases/updateTaskUseCase.js";
import { DeleteTaskUseCase } from "../../usecases/deleteTaskUseCase.js";

export class TaskController {
  constructor() {
    this.getTasksUseCase = new GetTasksUseCase();
    this.createTaskUseCase = new CreateTaskUseCase();
    this.updateTaskUseCase = new UpdateTaskUseCase();
    this.deleteTaskUseCase = new DeleteTaskUseCase();
  }

  getTasks = async (req, res) => {
    try {
      const result = await this.getTasksUseCase.getTasks();
      const { status, ...data } = result;

      return res.status(result.status).json(data);
    } catch (error) {
      console.error("getTasks", error.message);
      return res.status(500).json({ msg: error.message });
    }
  };

  createTask = async (req, res) => {
    try {
      const result = await this.createTaskUseCase.createTask(req.body);
      const { status, ...data } = result;

      return res.status(result.status).json(data);
    } catch (error) {
      console.error("createTask", error.message);
      return res.status(500).json({ msg: error.message });
    }
  };

  updateTask = async (req, res) => {
    try {
      const result = await this.updateTaskUseCase.updateTask(req.body);
      const { status, ...data } = result;

      return res.status(result.status).json(data);
    } catch (error) {
      console.error("updateTask", error.message);
      return res.status(500).json({ msg: error.message });
    }
  };

  deleteTask = async (req, res) => {
    try {
      const id = req.body?.ID ?? req.query?.ID ?? req.params?.ID;
      const result = await this.deleteTaskUseCase.deleteTask(id);
      const { status, ...data } = result;

      return res.status(result.status).json(data);
    } catch (error) {
      console.error("deleteTask", error.message);
      return res.status(500).json({ msg: error.message });
    }
  };
}
