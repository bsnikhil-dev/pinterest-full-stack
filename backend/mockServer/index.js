import express from "express";
import cors from "cors";

import pinRouter from "./routes/pin.route.js";
import usersRouter from "./routes/users.route.js";
import collectionsRouter from "./routes/collections.route.js";
import commentRouter from "./routes/comment.route.js";
import connectDB from "./utils/databaseConnection.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/pins", pinRouter);
app.use("/users", usersRouter);
app.use("/collections", collectionsRouter);
app.use("/comments", commentRouter);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on PORT 3000!");
});
