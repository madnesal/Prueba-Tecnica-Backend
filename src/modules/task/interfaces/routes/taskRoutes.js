import express from "express";
import { TaskController } from "../controllers/taskController.js";

export class TaskRoutes {
  constructor() {
    this.router = express.Router();
    this.taskController = new TaskController();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get("/getTasks", (req, res) =>
      this.taskController.getTasks(req, res),
    );

    this.router.post("/createTask", (req, res) =>
      this.taskController.createTask(req, res),
    );

    this.router.put("/updateTask", (req, res) =>
      this.taskController.updateTask(req, res),
    );

    this.router.delete("/deleteTask", (req, res) =>
      this.taskController.deleteTask(req, res),
    );
  }

  getRouter() {
    return this.router;
  }
}
