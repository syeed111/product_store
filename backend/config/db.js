import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

//postgresql://neondb_owner:npg_ajD1lqcg4Kpd@ep-late-meadow-a8g9ej4r-pooler.eastus2.azure.neon.tech/neondb?sslmode=require

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
