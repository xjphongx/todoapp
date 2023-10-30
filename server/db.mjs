//get database from postgres

import pg from "pg"
import dotenv from "dotenv";
dotenv.config();
const {Pool} = pg

const devConfig = {
    user:process.env.USER,
    password: process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.PORT,
    database: process.env.DATABASE
};

const proConfig = {
  connectionString: process.env.DATABASE_URL,
}
/* process.env.NODE_ENV === "production" ? proConfig : devConfig */

const pool = new Pool(
  process.env.NODE_ENV === "production" ? proConfig : devConfig
)



export default pool