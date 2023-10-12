const PORT = process.env.PORT ?? 8000

import express from "express";
import cors from "cors";
import pool from "./db.mjs"
import * as uuid from  "uuid"

const app = express();
app.use(cors())
app.use(express.json())

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

//create a new todo
app.post('/todos', async (req,res)=>{
  
  const {user_email, title, progress, date} = req.body
  console.log(user_email, title, progress, date)
  const id = uuid.v4()
  try{
    const newTodo = await pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1,$2,$3,$4,$5)',[id, user_email, title, progress, date])
    return res.status(200).json(newTodo)
  }catch(err){
    console.log("error")
    console.error(err)
  }
})


app.listen(PORT, ()=>{
  console.log(`Server running on PORT ${PORT}`)
})