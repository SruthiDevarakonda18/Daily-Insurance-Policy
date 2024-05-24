import React,{ useState } from 'react'
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { ClientLoginContextObj } from '../Context/ClientLoginContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function PurchasePolicy() {
  let navigate = useNavigate();
    let {register,handleSubmit,formState: { errors }}= useForm();
    let {userLoginStatus,currentUser}=useContext(ClientLoginContextObj)

  //const policyData,setPolicyData  = useState([])
    //UseEffect 

async function HandlePolicy(policyObj){
    console.log(policyObj);
    //const selectedPolicy = policyData.filter((item) => item.policyId === policyObj.policyId)
    const updatedUser = ({
      userId : currentUser.username,
      premium : policyObj.premium,
      policyname:policyObj.policyname,
      // maxCost : selectedPolicy.maxCost,
      //DateOfPurchase : new Date().toString();
      //ClaimAmount : "",
      //ClaimStatus : false,
      //DateTimeOfClaim : ""
    })
    console.log(updatedUser);
    await axios.post("http://localhost:4000/policyClaimTable",updatedUser);
  navigate('/process-claim')
}
  return (
    <>
    {userLoginStatus === false?
      (
        <div>
        <h3>Ouch! you have not logged in!</h3>
        <Link to="/clientLogin" >Click here to login!</Link>
        </div>
      ):(
    <form className=' w-25  mx-auto mt-5'  onSubmit={handleSubmit(HandlePolicy)} style={{minHeight:'80vh'}}>
        
            <h1 className="mb-3 fs-3 text-center ">Purchase your Daily Insurance Policy</h1>
        
            <div className='mb-4'>
                 <select  {...register('policyname',{required:true})} className = "form-control">
              <option value="">Policy name</option>
{/* 
            policyData.map((item)=>{
              return  <option value={item.POL1}>{item.policyName}</option>
              
            })
               */}
              <option value="Daily Accidental Coverage policy">Daily Accidental Coverage policy </option>
          </select> 
           {errors.policyname?.type==='required' && <p className='fs-8' >please select from the list</p> }
</div>
         
          <div className='mb-4'>
            <label  className="form-label">Premium</label>
            <input type='number' className='form-control' {...register('premium',{required:true})}/>
            {errors.premium?.type==='required' && <p>premium is required</p> }
          </div>
          <br/>
         <button type='submit' className='btn btn-primary  float-end'>Next</button>
    </form>
      )}
    </>
  )
}

export default PurchasePolicy
