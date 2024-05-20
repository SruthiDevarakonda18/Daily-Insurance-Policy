import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ClientLoginContextObj } from '../Context/ClientLoginContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddWallet() {
  let navigate = useNavigate();
  let { register, handleSubmit, formState: { errors } } = useForm();
  let { handleUser, userLoginStatus,currentUser,setCurrentUser} = useContext(ClientLoginContextObj);
 let {walletAmount, setWalletAmount,updateWalletAmount}=useContext(ClientLoginContextObj);
  
 console.log(currentUser);

  async function HandleWallet(userObj) {
    try {
      // const updatedWallet = ({ userId: userObj.username }, { amount: setWalletAmount });
      
      // console.log(userObj)
      

      let updatedUser = {...currentUser,wallet : userObj}
      
      let res = await axios.put(`http://localhost:4000/wallet/${currentUser.id}`, updatedUser);
      console.log(updatedUser);
      setCurrentUser(updatedUser)
      handleUser(updatedUser);
      navigate('/purchase-policy');
    } catch (err) {
      console.log(err.message);
    }
  }
  

  return (
    <>
      {userLoginStatus === false ? (
        <div>
          <h3>Ouch! You have not logged in!</h3>
          <Link to="/clientLogin">Click here to login!</Link>
        </div>
      ) : (
        <form
          className='w-25 mx-auto mt-5'
          onSubmit={handleSubmit(HandleWallet)}
          style={{ minHeight: '80vh' }}
        >
          <h1 className="mb-3 fs-3 text-center">Import your wallet and add balance</h1>

          <div className='mb-4'>
            <select {...register('walletType', { required: true })} className="form-control">
              <option value="">Wallet</option>
              <option value="credit card">Credit Card</option>
              <option value="debit card">Debit Card</option>
              <option value="UPI">UPI</option>
            </select>
            {errors.wallet?.type === 'required' && <p className='fs-8'>Please select from the list</p>}
          </div>

          <div id="amt">
          <label className="form-label">Amount</label>
          <input type='text' className='form-control' {...register('amount', { required: true })} />
         
          {errors.amount?.type === 'required' && <p className='fs-8'>Amount is required</p>}
          </div>
          <br />
          <button type='submit' className='btn btn-primary float-end'>Next</button> 
        </form>
      )}
    </>
  );
}

export default AddWallet;

// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { ClientLoginContextObj } from '../Context/ClientLoginContext';
// import { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios'


// function ProcessClaim() {
//     let {register,handleSubmit,formState: { errors }}= useForm();
//     let {userLoginStatus}=useContext(ClientLoginContextObj)
//     function HandleClaim(userObj){
//       axios.post('http://localhost:4000/users',userObj);
     
//     console.log(userObj)
//   }
//   return (
//     <>
//     {userLoginStatus === false?
//       (
//         <div>
//         <h3>Ouch! you have not logged in!</h3>
//         <Link to="/clientLogin" >Click here to login!</Link>
//         </div>
//       ):(
//     <form className=' w-25  mx-auto mt-5' onSubmit={handleSubmit(HandleClaim)} style={{minHeight:'80vh'}}>
        
//             <h1 className="mb-3 fs-3 text-center ">Raise a Claim Request</h1>
        
//             <div className='mb-4'>

//             <select  {...register('policyname',{required:true})} className = "form-control">
//               <option value="">Policy name</option>
//               <option value="Daily Accidental Coverage policy">Daily Accidental Coverage policy </option>
//           </select>
//           {errors.policyname?.type==='required' && <p className='fs-8' >please select from the list</p> }
//           </div>

//           <label  className="form-label">Date of policy purchase</label>
//           <input type='date'className='form-control'{...register('date',{required:true})}/>
//           {errors.date && <p>date is required</p> }

//           <label  className="form-label">Claim amount</label>
//           <input type='number'className='form-control'{...register('Claimamount',{required:true})}/><br/>
//           {errors.Claimamount?.type==='required' && <p className='fs-8' >please enter the Claim amount</p> }
          
          
//          <button type='submit' className='btn btn-primary  float-end'>Next</button>
        
//     </form>
//       )}
//     </>
//   )
// }

// export default ProcessClaim
