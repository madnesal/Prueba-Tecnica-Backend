import { Pool } from "pg";
import ConfigService from "../config/env.js";

export class DBConnection {
  constructor() {
    this.pool = null;
    this.isConnectionActive = false;
  }

  async connect() {
    if (!this.pool) {
      const config = {
        host: ConfigService.get("DB_HOST"),
        user: ConfigService.get("DB_USER"),
        password: ConfigService.get("DB_PASSWORD"),
        database: ConfigService.get("DB_NAME"),
        max: parseInt(ConfigService.get("DB_POOL_MAX")),
        idleTimeoutMillis: parseInt(ConfigService.get("DB_IDLE_TIMEOUT")),
        connectionTimeoutMillis: parseInt(
          ConfigService.get("DB_CONNECT_TIMEOUT"),
        ),
      };

      try {
        this.pool = new Pool(config);
        const client = await this.pool.connect();
        await client.query("SELECT 1");
        client.release();
        this.isConnectionActive = true;
      } catch (error) {
        console.error("Error in connect to the database", error.message);
        this.isConnectionActive = false;
        throw new Error("No connection to the database");
      }
    }
    return this.pool;
  }

  async getConnection() {
    try {
      if (!this.pool || !this.isConnectionActive) {
        await this.connect();
      }
      return this.pool;
    } catch (error) {
      console.error("Error in getConnection", error.message);
      throw new Error("The database connection is not available");
    }
  }

  async checkConnectionStatus() {
    if (!this.pool) {
      return false;
    }

    try {
      const client = await this.pool.connect();
      await client.query("SELECT 1");
      client.release();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new DBConnection();
