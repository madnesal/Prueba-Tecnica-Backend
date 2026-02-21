import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import http from "http";
import DBConnection from "./config/database.js";
import apiKeyMiddleware from "./shared/apiKeyMiddleware.js";
import { TaskRoutes } from "./modules/task/interfaces/routes/taskRoutes.js";
import ConfigService from "./config/env.js";

export class App {
  constructor() {
    this.taskRoutes = new TaskRoutes();
    this.app = express();
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["x-api-key", "content-type"],
      }),
    );
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set("port", ConfigService.get("PORT"));
    this.app.use(
      "/task",
      apiKeyMiddleware.validate,
      this.taskRoutes.getRouter(),
    );
    this.DBMainConnection = null;
  }

  startServer = async () => {
    http.createServer({}, this.app).listen(this.app.get("port"), () => {
      console.log(`Server is running on port ${ConfigService.get("PORT")}`);
    });

    if (!this.DBMainConnection) {
      try {
        this.DBMainConnection = await DBConnection.getConnection();
      } catch (error) {
        console.error("APP", error.message);
      }
    }
  };
}

new App().startServer();
