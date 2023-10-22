import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import React from "react"
import { useCookies } from 'react-cookie'



function App() {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const userEmail = cookies.Email
  const authToken = cookies.AuthToken
  const [tasks, setTasks] = React.useState(null)


  //get the data from Postgres
  const getData = async () =>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const data = await response.json()
      setTasks(data)
    }catch(err){
      console.log(err)
    }
  }

  React.useEffect(()=>{
    if(authToken){
      getData()
    }
  }, [])

  //Sort by date
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date)- new Date(b.date))

  return (
    <div className="app">
    {/* If the auth token exist show the app, if not show the login page */}
      {!authToken&& <Auth/>}
      {authToken && <>
        <ListHeader listName={"Todo List"} getData={getData}  />
        <p className='user-email'>Welcome Back {userEmail}</p>
        {sortedTasks?.map((task)=>{
          return(
            <ListItem key={task.id} task={task} getData={getData}/>
          ) 
        })}

      </>
      }
      
          
    </div>
  );
}

export default App;
