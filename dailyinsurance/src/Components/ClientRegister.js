import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function ClientRegister() {

        const navigate = useNavigate();
        
        let {register,handleSubmit,formState: { errors }}= useForm();
      
       async function HandleSubmit(userObj){
          try{
          
          let res=await axios.post('http://localhost:4000/users',userObj)
          console.log(res)
            navigate('/clientLogin')
          }
         catch(err){
          console.log(err.message)
         }
        }

  return (
    <>
      <form className='mx-auto w-25 mt-5' onSubmit={handleSubmit(HandleSubmit)} style={{minHeight:'80vh'}}>
        <h3>Create your account</h3>

        
        <label  className="form-label">First Name</label>
        <input type='text'  className='form-control mb-3 mb-3' {...register('First name',{required:true})}  />
        {errors.Firstname && <p>First name is required</p> }

        <label  className="form-label">Last Name</label>
        <input type='text'   className='form-control mb-3 mb-3' {...register('Last name',{required:true})}  />
        {errors.Lastname && <p>Last name is required</p> }
       
        
        <label  className="form-label">Username</label>
        <input type='text' className='form-control mb-3 mb-3' {...register('username',{required:true})}  />
        {errors.username && <p>Username is required</p> }

        <label  className="form-label">Email</label>
        <input type='mail' className='form-control mb-3' {...register('email',{required:true})}  />
        {errors.email && <p>Email is required</p> }

        <label  className="form-label">Password</label>
        <input type='password' className='form-control mb-3' {...register('password',{required:true})}  />
        {errors.password && <p>Password is required</p> }

        <label  className="form-label">Confirm</label>
        <input type='password' className='form-control mb-3' {...register('confirm',{required:true})}  />
        {errors.password && <p>confirm Password is required</p> }
        

        <p className='float-start'><Link to="/clientlogin" >sign in instead</Link> </p>

        <button className='btn btn-primary float-end' type='submit' >Next</button>
        
      </form>
      </>
  )
}

export default ClientRegister
