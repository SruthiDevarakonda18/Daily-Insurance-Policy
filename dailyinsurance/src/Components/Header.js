import React, { useContext } from 'react'
import { ClientLoginContextObj } from '../Context/ClientLoginContext'
import { NavLink } from 'react-router-dom'
function Header() {
  let {userLoginStatus}=useContext(ClientLoginContextObj)
  let {setUserLoginStatus}=useContext(ClientLoginContextObj)
  let {setCurrentUser}=useContext(ClientLoginContextObj)
  function userLogout(){
    setCurrentUser({})
    setUserLoginStatus(false)
  }
  return (
    <div className='float-end'>
      {userLoginStatus===false?(
        <NavLink className='nav-link active nav-brand nav-item fs-5' to="/ClientLogin" onClick={userLogout} >Login</NavLink>
      )
    :(
      <NavLink className='nav-link active nav-brand nav-item fs-5' to="/ClientLogin" onClick={userLogout} >Logout</NavLink>
    )}
    </div>
  )
  }

export default Header