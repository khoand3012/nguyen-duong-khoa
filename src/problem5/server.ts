import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  res.send("Please use the /api routes to access the items API");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
