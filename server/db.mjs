//get database from postgres

//const Pool = require('pg').Pool
import pg from "pg"
import dotenv from "dotenv";
dotenv.config();
const {Pool} = pg



const pool = new Pool({
  user:process.env.USER,
  password: process.env.PASSWORD,
  host:process.env.HOST,
  port:process.env.DBPORT,
  database: process.env.DATABASE
}
)


export default pool