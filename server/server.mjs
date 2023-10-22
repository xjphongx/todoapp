const PORT = process.env.PORT || 8000

import express from "express";
import cors from "cors";
import pool from "./db.mjs"
import * as uuid from  "uuid"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

//signup
app.post('/signup', async (req,res)=>{
  const {email,password} = req.body
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  try{
    const signUp = await pool.query(`INSERT INTO users (email,hashed_password) VALUES($1,$2)`,[email, hashedPassword])
    
    const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
  
    res.json({email, token})
  
  }catch(err){
    console.log(err)
    if(err){
      res.json({detail:err.detail})
    }
  }
})

//login
app.post('/login', async (req,res)=>{
  const {email,password} = req.body
  console.log(email,password)
  //hash the password
  try{
    const users = await pool.query('SELECT * FROM users WHERE email = $1',[email])
   
    //if no user is found bc email is a primary key
    if(!users.rows.length) return res.json({detail:'User does not exist'})
    
    const success = await bcrypt.compare(password, users.rows[0].hashed_password)
    
    const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})

    if(success){
      res.json({'email': users.rows[0].email,token})
    } else {
      res.json({detail: "Login failed"})
    }

  
  }catch(err){
    console.log(err)
  }
})




app.listen(PORT, ()=>{
  console.log(`Server running on PORT ${PORT}`)
})