import TickIcon from './Ticklcon'
import ProgressBar from './ProgressBar'

export default function ListItem({task}){
  console.log(task)
  return(
    <>
      <li className="list-item">
        <div className="info-container">
          <TickIcon/>
          <p className="task-title">{task.title}</p>
          <ProgressBar/>
        </div>
        <div className='button-container'>
          <button className='edit'>EDIT</button>
          <button className='delete'>Delete</button>
        </div>
      </li>
    </>
  )
}