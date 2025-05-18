import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.get("/api", (req: Request, res: Response) => {
  res.json({ message: "Hello from the API!" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
