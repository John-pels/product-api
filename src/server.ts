import express, { Express, ErrorRequestHandler } from "express";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  setTimeout(() => {
    next(new Error("Hello"));
  }, 1);
});

app.use("/api", protect as express.RequestHandler, router);

app.post("/user", createNewUser);
app.post("/signin", signin);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorized" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "invalid input" });
  } else {
    res.status(500).json({ message: "Oooops! An error occurred" });
  }
};

app.use(errorHandler);

export default app;
