import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql` 
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )`;
  } catch (error) {
    console.log("Error in initDB()", error);
  }
}

initDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

//postgresql://neondb_owner:npg_ajD1lqcg4Kpd@ep-late-meadow-a8g9ej4r-pooler.eastus2.azure.neon.tech/neondb?sslmode=require
