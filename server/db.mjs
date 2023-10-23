//get database from postgres

//const Pool = require('pg').Pool
import pg from "pg"
import dotenv from "dotenv";
dotenv.config();
const {Pool} = pg

const devConfig = {
    user:process.env.USER,
    password: process.env.PASSWORD,
    host:process.env.HOST,
    port:process.env.DBPORT,
    database: process.env.DATABASE
};


const proConfig = {
  connectionString: process.env.DATABASE_URL //heroku addons needed, heroku will provide us this
}

//heroku provides a node_env to check if its in production or not
const pool = new Pool({
  connectionString: process.env.NODE_ENV === "production" ? proConfig : devConfig
})



export default pool