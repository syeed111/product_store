import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//postgresql://neondb_owner:npg_ajD1lqcg4Kpd@ep-late-meadow-a8g9ej4r-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
