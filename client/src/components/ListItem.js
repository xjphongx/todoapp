import TickIcon from './Ticklcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'
import React from 'react'

const API_URL = 
  process.env.NODE_ENV === "production"
    ? "https://deployed-to-do-app-5083e8cc079c.herokuapp.com/"
    : process.env.REACT_APP_SERVERURL


export default function ListItem({task, getData}){
  const [showModal, setShowModal] = React.useState(false)

  const deleteItem = async() =>{
    try{
      const response = await fetch(`${API_URL }/todos/${task.id}`,{
        method:'DELETE'
      })
      if(response.status === 200){
        getData()//get the updated todos from the database after running delete query
      }
    }catch(err){
      console.log(err)
    }
  }


  return(
    <>
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar progress={task.progress}/>
        </div>
        <div className='button-container'>
          <button className='edit' onClick={()=>{setShowModal(true)}}>EDIT</button>
          <button className='delete' onClick={deleteItem}>Delete</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
      </li>
    </>
  )
}