const PORT = process.env.PORT ?? 8000

import express from "express";
import cors from "cors";
import pool from "./db.mjs"

const app = express();
app.use(cors())

// get specific todo
app.get('/todos', async (req,res)=>{
  try{
    const todos = await pool.query('SELECT * FROM todos')
    res.json(todos.rows)
  }catch(err){
    console.error(err)
  }
})

app.get('/todos/:userEmail', async (req,res)=>{
  const {userEmail}=req.params
  try{
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1',[userEmail])
    res.json(todos.rows)
  }catch(err){
    console.error(err)
  }
})


app.listen(PORT, ()=>{
  console.log(`Server running on PORT ${PORT}`)
})