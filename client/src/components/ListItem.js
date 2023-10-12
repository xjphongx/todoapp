import TickIcon from './Ticklcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'
import React from 'react'

export default function ListItem({task, getData}){
  const [showModal, setShowModal] = React.useState(false)

  return(
    <>
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar/>
        </div>
        <div className='button-container'>
          <button className='edit' onClick={()=>{setShowModal(true)}}>EDIT</button>
          <button className='delete'>Delete</button>
        </div>
        {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task}/>}
      </li>
    </>
  )
}