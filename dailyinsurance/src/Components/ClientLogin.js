import React,{useContext,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ClientLoginContextObj } from '../Context/ClientLoginContext'
function ClientLogin() {
  
    let {userLoginStatus}=useContext(ClientLoginContextObj)
    let {onClientLogin}=useContext(ClientLoginContextObj)
    let {error}=useContext(ClientLoginContextObj)

    let {register,handleSubmit}=useForm()
    let navigate=useNavigate()
    useEffect(() => {
      if (userLoginStatus === true)
      {
        navigate("/AddWallet");
      }
    },[userLoginStatus]);

  return (
    <form className=' w-25  mx-auto mt-5' onSubmit={handleSubmit(onClientLogin)} style={{minHeight:'80vh'}}>
        
            <h1 className="mb-3 fs-3 text-center ">Sign in your account</h1>
            
            {error.length!==0 && <p>{error}</p>  }
            
            <label  className="form-label ">Username</label>
            <input type="text" className='form-control mb-3 ' {...register('username')} />

            
            <label  className="form-label ">Password</label>
            <input type="password" className='form-control mb-3 ' {...register('password')} />
            
            <p className='float-start'><Link to="/" >create account</Link> </p>

            <button type='submit' className='btn btn-primary  float-end'>Login</button>
        
    </form>
  )
}

export default ClientLogin