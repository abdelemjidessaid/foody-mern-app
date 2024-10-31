import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRouter from "./routes/UserRoute";

// connect the mongo db
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(`Error while connecting the MongoDB: ${error}`));

const app = express();

app.use(express.json());
app.use(cors());

// check health's end point
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK" });
});

// user end point
app.use("/api/my/user", userRouter);

app.listen(7000, () => {
  console.log("Server started running on http://localhost:7000");
});
