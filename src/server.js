import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import express from "express";
import memberRoute from "./routes/member.route.js"
import projectRoute from "./routes/project.route.js"
import { swaggerDocs } from "./swagger.js";
dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
swaggerDocs(app);

app.use("/api/members", memberRoute)
app.use("/api/projects", projectRoute)
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

