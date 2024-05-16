import React,{useState} from 'react'
import { ClientLoginContextObj } from './ClientLoginContext';
import axios from 'axios';


const ClientLoginStore = ({children}) => {

  let [user,setUser]=useState({})
  

    const handleUser=async (userObj)=>{
        setUser(userObj);
      }

     

  let [currentUser,setCurrentUser]=useState({})
  let [userLoginStatus,setUserLoginStatus]=useState(false)
  let [error,setError]=useState('')

  const [walletAmount, setWalletAmount] = useState(0);
  const updateWalletAmount = (newAmount) => {
    setWalletAmount(newAmount);
  };
  async function onClientLogin(userCredObj){
    let res=await axios.get(`http://localhost:4000/users?username=${userCredObj.username}`)
    let userList=res.data
    console.log(userCredObj)
    if(userList.length===0){
        setError('Invalid Username')
    }
    else{
        let result=(userList[0].password)

        if(userCredObj.password !== result){
        setError("Invalid Password")
        }
        else{
            setCurrentUser(userList[0])
            setUserLoginStatus(true)
            
        }
}
}
  return (
  <ClientLoginContextObj.Provider value={{onClientLogin,currentUser,setCurrentUser,userLoginStatus,setUserLoginStatus,error,user,handleUser,walletAmount, setWalletAmount,updateWalletAmount}}>{children}</ClientLoginContextObj.Provider>
  )
}

export default ClientLoginStore