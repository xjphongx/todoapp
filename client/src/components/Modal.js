import React from 'react'


export default function Modal({mode,setShowModal, getData,task}){
   const editMode = mode=== 'edit' ? true: false
   const [data, setData] = React.useState({
    user_email: editMode ? task.user_email : 'jimmy@test.com',
    title: editMode?task.title: "test",
    progress: editMode?task.progress:50,
    date: editMode ? task.date : new Date()
  })
 
  //post data
  const postData = async (e) =>{
    e.preventDefault()
    console.log(JSON.stringify(data))
    try{
      const response = await fetch('http://localhost:8000/todos',{
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if(response.status === 200) {
        console.log("successful")
        setShowModal(false) //turn off modal once submitted 
        getData()
      }
    }catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    setData(data=>({
      ...data,
      [name]: value
    }))
    console.log(data)
  }


  return(
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={()=> setShowModal(false)}>X</button>
        </div>

        <form>
          <input 
            required 
            maxLength={30}
            placeholder="Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange} 
          />
          <br/>
          <label htmlFor="range">Drag to select your current progress</label>
          <input 
            required
            id="range"
            type="range"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          
          <input className={mode} type="submit" onClick={editMode? '': postData}/>
        </form>

      </div>
    </div>
  )
}