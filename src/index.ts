import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import userRouter from "./routes/UserRoute";
import restaurantRouter from "./routes/MyRestaurantRoute";
import _restaurantRouter from "./routes/RestaurantRoute";

// connect the mongo db
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log(`Error while connecting the MongoDB: ${error}`));

// initialize the cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_COULD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// initialize an express app instance
const app = express();
app.use(express.json());
app.use(cors());

// check health's end point
app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK" });
});

// user end point
app.use("/api/my/user", userRouter);

// restaurant end point
app.use("/api/my/restaurant", restaurantRouter);
app.use("/api/restaurant", _restaurantRouter);

app.listen(7000, () => {
  console.log("Server started running on http://localhost:7000");
});
