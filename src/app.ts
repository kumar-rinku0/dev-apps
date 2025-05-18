import express, { Request, Response } from "express";
const app = express();
const port = 3000;

// Importing the user router
import userRouter from "./routers/user";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/user", userRouter);

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the API!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
