import Modal from './Modal'

export default function ListHeader({listName}){

  const signOut = ()=>{
    console.log('signout')
  }


  return(
    <div className="list-header">
      <h1>{listName}</h1>
      <div className="button-container">
       <button className='create'>ADD NEW</button>
       <button className='signout' onClick={signOut}>SIGN OUT</button>
      </div>
      <Modal/>
    </div>
  )
}