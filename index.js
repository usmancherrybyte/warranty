import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import morgan from "morgan";
import cors from "cors";
import routes from "./src/routes/index.js";
import { checkConnection } from "./config/connection.js";
import userRouter from "./src/routes/userRoute.js";
// Load environment variables from .env file
dotenv.config();

const app = express();

//---- Middleware for parsing request body ----
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

app.use("/api/v1", routes);

//----------------MongoDB Connection-------------------
checkConnection(
  "mongodb+srv://sikandar:mrza2001@cluster0.dofl8t1.mongodb.net/warrantyproject"
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
