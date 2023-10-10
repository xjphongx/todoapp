//get database from postgres

//const Pool = require('pg').Pool
import pg from "pg"
import dotenv from "dotenv";

const {Pool} = pg
dotenv.config();


const pool = new Pool({
  user:process.env.USER,
  password: process.env.PASSWORD,
  host:process.env.HOST,
  port:process.env.DBPORT,
  database: 'todoapp'
})



export default pool