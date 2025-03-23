import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.route.js";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware để parse JSON
app.use(express.json());
app.use(cors());

// Kết nối database
connectDB();


app.use("/api/posts", blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
