import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"
import "dotenv/config"
import cohortRoutes from "./routes/cohorts.routes.js";
import studentRoutes from "./routes/students.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from './routes/user.routes.js';

const PORT = 5005;


// DATABASE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/cohorts-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));


// INITIALIZE EXPRESS APP
const app = express();


// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/auth', authRoutes)
app.use('/api', usersRoutes)


// ROUTES
app.get("/docs", (req, res) => {
  res.sendFile(import.meta.dirname + "/views/docs.html");
});

app.use("/api", cohortRoutes);
app.use("/api", studentRoutes);


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});