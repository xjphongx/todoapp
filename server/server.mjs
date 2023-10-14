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

//get todos with a specific email
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
  const id = uuid.v4()
  try{
    const newTodo = await pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1,$2,$3,$4,$5)',[id, user_email, title, progress, date])
    return res.status(200).json(newTodo)
  }catch(err){
    console.log("error")
    console.log(err)
  }
})

//edit a todo given an id
app.put('/todos/:id', async(req,res)=>{
  const {id} = req.params
  const {user_email, title, progress, date} = req.body
  try{
    //update the todos tables and set these table values to variable 1... variable 5, where the id matches the given task id [1, 2, 3, 4, 5]
    const editTodo = await pool.query('UPDATE todos SET user_email=$1, title=$2, progress=$3, date=$4 WHERE id=$5;',[user_email, title, progress, date,id])
    res.status(200).json(editTodo)
  }catch(err){
    console.log(err)
  }
})

//delete a todo
app.delete('/todos/:id', async(req,res)=>{
  const {id} = req.params
  try{
    const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1;',[id])
    res.status(200).json(deleteTodo)
  }catch(err){
    console.log(err)
  }

})

app.listen(PORT, ()=>{
  console.log(`Server running on PORT ${PORT}`)
})