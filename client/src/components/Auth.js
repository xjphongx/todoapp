import { useState } from "react"


export default function Auth(){
  const [isLogIn, setIsLogin] = useState(true)
  const [error, setError] = useState(null)
 
  const viewLogin = (status) =>{
    setError(null)
    setIsLogin(status)
  }

  return(
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          {isLogIn ? 'Please log in' : 'please sign up!'}
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          {!isLogIn && <input type="password" placeholder="confirm password"/>}
          <input type="submit" className="create" />
          {error && <p>{error}</p>}
        </form>

        <div className="auth-options">
          <button 
            onClick={()=>{viewLogin(false)}}
            style={{backgroundColor : !isLogIn ? 'rgb(255,255,255)':'rgb(188,188,188)'}}
          >Sign Up</button>
          <button 
            onClick={()=>{viewLogin(true)}}
            style={{backgroundColor : isLogIn ? 'rgb(255,255,255)':'rgb(188,188,188)'}}
          >Login</button>
        </div>


      </div>
    </div>
  )
}