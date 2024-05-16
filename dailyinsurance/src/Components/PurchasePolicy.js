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
    let {userLoginStatus}=useContext(ClientLoginContextObj)
//     const policyData = [
//         { id: 1, name: 'Daily Accidental Coverage policy upto 10,000', premium: 100 },
//         { id: 2, name: 'Policy 2', premium: 200 },
//         { id: 3, name: 'Policy 3', premium: 300 },
//       ];
//       const [selectedPolicy, setSelectedPolicy] = useState('');

//   const handlePolicyChange = (event) => {
//     setSelectedPolicy(event.target.value);
//   };
function HandlePolicy(userObj){
    axios.post('http://localhost:4000/users',userObj)
  console.log(userObj)
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
              <option value="Daily Accidental Coverage policy">Daily Accidental Coverage policy </option>
          </select> 
           {errors.policyname?.type==='required' && <p className='fs-8' >please select from the list</p> }


            {/* <label htmlFor="policy">Select Policy:</label>
      <select id="policy" value={selectedPolicy} onChange={handlePolicyChange} className = "form-control">
        <option value="">Select a policy</option>
        {policyData.map((policy) => (
          <option key={policy.id} value={policy.id}>
            {policy.name}
          </option>
        ))}
      </select>
      {selectedPolicy && (
        <div>
          <p>Selected Policy: {selectedPolicy}</p>
          <p>
            Policy Name: {policyData.find((policy) => policy.id === Number(selectedPolicy)).name}
          </p>
          <p>
            Policy Premium:
            {policyData.find((policy) => policy.id === Number(selectedPolicy)).premium}
          </p>
        </div> 
)*/}
</div>
         
          <div className='mb-4'>
          <label  className="form-label">Premium</label>
          <input type='number' className='form-control' {...register('amount',{required:true})}/>
          {errors.amount?.type==='required' && <p>amount is required</p> }
          </div>
          <br/>
         <button type='submit' className='btn btn-primary  float-end'>Next</button>
    </form>
      )}
    </>
  )
}

export default PurchasePolicy