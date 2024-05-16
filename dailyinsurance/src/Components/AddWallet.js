
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
  let { handleUser, userLoginStatus} = useContext(ClientLoginContextObj);
 let {walletAmount, setWalletAmount,updateWalletAmount}=useContext(ClientLoginContextObj);


  async function HandleWallet(userObj) {
    try {
      const updatedWallet = await({ userId: userObj.username }, { amount: setWalletAmount });
    console.log(updatedWallet) 
      let res = await axios.post('http://localhost:4000/users', userObj);
      console.log(res);
      handleUser(userObj);
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
            {/* <p>{userId}</p> */}
            <select {...register('wallet', { required: true })} className="form-control">
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