import React from 'react'
import { useForm } from 'react-hook-form';
import { ClientLoginContextObj } from '../Context/ClientLoginContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


function ProcessClaim() {
    let {register,handleSubmit,formState: { errors }}= useForm();
    let {userLoginStatus,currentUser}=useContext(ClientLoginContextObj)

    function HandleClaim(userObj){
         console.log(userObj)
      const claim=({
        Claimamount:userObj.Claimamount,
        policydate:userObj.policydate
      })
      axios.put(`http://localhost:4000/policyClaimTable/${currentUser.id}`, claim)
    console.log(claim)
    }
    const validateClaimAmount = (value) => {
      if (value > 10000) {
        return 'Claim amount should not exceed 10,000';
      }
      return true;
    };
  
  return (
    <>
    {userLoginStatus === false?
      (
        <div>
        <h3>Ouch! you have not logged in!</h3>
        <Link to="/clientLogin" >Click here to login!</Link>
        </div>
      ):(
    <form className=' w-25  mx-auto mt-5' onSubmit={handleSubmit(HandleClaim)} style={{minHeight:'80vh'}}>
        
            <h1 className="mb-3 fs-3 text-center ">Raise a Claim Request</h1>
        
            <div className='mb-4'>

            <select  {...register('policyname',{required:true})} className = "form-control">
              <option value="">Policy name</option>
              <option value="Daily Accidental Coverage policy">Daily Accidental Coverage policy </option>
          </select>
          {errors.policyname?.type==='required' && <p className='fs-8' >please select from the list</p> }
          </div>

          <label  className="form-label">Date of policy purchase</label>
          <input type='date'className='form-control'{...register('policydate',{required:true})}/>
          {errors.date && <p>date is required</p> }

          <label className="form-label">Claim amount</label>
          <input
            type="number"
            className="form-control"
            {...register('Claimamount', {
              required: true,
              validate: validateClaimAmount,
            })}
          />
         <br/>
          {errors.Claimamount?.type==='required' && <p className='fs-8' >please enter the Claim amount</p> }
          {errors.Claimamount?.message && (
            <p className="fs-8">{errors.Claimamount.message}</p>
          )}

          
         <button type='submit' className='btn btn-primary  float-end'>Next</button>
        
    </form>
      )}
    </>
  )
}

export default ProcessClaim


