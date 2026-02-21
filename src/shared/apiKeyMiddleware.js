import env from "../config/env.js";

export class ApiKeyMiddleware {
  validate = (req, res, next) => {
    const apiKey = env.get("API_KEY");

    if (!apiKey) {
      return next();
    }

    const key = req.headers["x-api-key"] || req.headers["api-key"];

    if (!key || key !== apiKey) {
      return res.status(401).json({ ok: false, msg: "Not authorized" });
    }

    next();
  };
}

export default new ApiKeyMiddleware();
