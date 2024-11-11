import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import locationRoutes from "./routes/location.route.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is Listening!");
});

app.use(cors());

app.use(express.json());

app.get("/test", (req, res) => {
  res.json("test succesful!");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api", locationRoutes);

app.use(
  cors({
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"], // Allow specific HTTP methods
    credentials: true, // Allow credentials like cookies if needed
  })
);

app.use(errorHandler);
