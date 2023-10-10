import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import React from "react"


function App() {
  const userEmail = 'jimmy@test.com'
  const [tasks, setTasks] = React.useState(null)

  //get the data from Postgres
  const getData = async () =>{
    try{
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
      const data = await response.json()
      console.log(data)
      setTasks(data)
    }catch(err){
      console.log(err)
    }
  }

  React.useEffect(()=>getData, [])

  console.log(tasks)
  
  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date)- new Date(b.date))

  return (
    <div className="app">
      <ListHeader listName={"Todo List"} />
      {sortedTasks?.map((task)=>{
        return(
          <ListItem key={task.id} task={task}/>
        ) 
      })}

          
    </div>
  );
}

export default App;
