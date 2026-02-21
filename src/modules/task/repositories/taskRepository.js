import DBConnection from "../../../config/database.js";
import { TaskEntity } from "../domain/taskEntity.js";

export class TaskRepository {
  constructor() {
    this.DBMainConnection = null;
  }

  rowToEntity = (row) => {
    const raw = row || {};
    return new TaskEntity({
      ID: raw.ID ?? raw.id,
      TITULO: raw.TITULO ?? raw.titulo,
      DESCRIPCION: raw.DESCRIPCION ?? raw.descripcion,
      ESTADO: raw.ESTADO ?? raw.estado,
    });
  };

  ensureConnection = async () => {
    if (!this.DBMainConnection) {
      this.DBMainConnection = await DBConnection.getConnection();
    }
    const status = await DBConnection.checkConnectionStatus();
    if (!status) {
      throw new Error("No connection to the database");
    }
    return this.DBMainConnection;
  };

  getTasks = async () => {
    console.info("getTasks");
    try {
      await this.ensureConnection();
      let query = "SELECT * FROM tareas";
      const resultado = await this.DBMainConnection.query(query);
      const data = resultado.rows.map((row) => this.rowToEntity(row));

      return {
        ok: true,
        msg: "Tasks obtained successfully",
        data,
      };
    } catch (error) {
      console.error("getTasks", error.message);
      return { ok: false, msg: error.message };
    }
  };

  insertTask = async (task) => {
    console.info("insertTask");
    try {
      await this.ensureConnection();
      const query =
        "INSERT INTO tareas (TITULO, DESCRIPCION, ESTADO) VALUES ($1, $2, $3) RETURNING *";
      const values = [task.TITULO, task.DESCRIPCION, task.ESTADO];
      const resultado = await this.DBMainConnection.query(query, values);
      const data = this.rowToEntity(resultado.rows[0]);

      return {
        ok: true,
        msg: "Task created successfully",
        data,
      };
    } catch (error) {
      console.error("insertTask", error.message);
      return { ok: false, msg: error.message };
    }
  };

  updateTask = async (task) => {
    console.info("updateTask");
    try {
      await this.ensureConnection();
      const query =
        "UPDATE tareas SET TITULO = $1, DESCRIPCION = $2, ESTADO = $3 WHERE ID = $4 RETURNING *";
      const values = [task.TITULO, task.DESCRIPCION, task.ESTADO, task.ID];
      const resultado = await this.DBMainConnection.query(query, values);

      if (resultado.rows.length === 0) {
        return { ok: false, msg: "Task not found" };
      }

      const data = this.rowToEntity(resultado.rows[0]);

      return {
        ok: true,
        msg: "Task updated successfully",
        data,
      };
    } catch (error) {
      console.error("updateTask", error.message);
      return { ok: false, msg: error.message };
    }
  };

  deleteTask = async (id) => {
    console.info("deleteTask");
    try {
      await this.ensureConnection();
      const query = "DELETE FROM tareas WHERE ID = $1 RETURNING *";
      const resultado = await this.DBMainConnection.query(query, [id]);

      if (resultado.rows.length === 0) {
        return { ok: false, msg: "Task not found" };
      }

      const data = this.rowToEntity(resultado.rows[0]);

      return {
        ok: true,
        msg: "Task deleted successfully",
        data,
      };
    } catch (error) {
      console.error("deleteTask", error.message);
      return { ok: false, msg: error.message };
    }
  };
}
