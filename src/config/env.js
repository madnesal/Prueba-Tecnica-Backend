import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(process.cwd(), `env`, `../../.env`),
});

class ConfigService {
  static get(key) {
    return process.env[key] || null;
  }
}

export default ConfigService;
