import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './RootLayout'
import './App.css'
import ClientLogin from './Components/ClientLogin'
import ClientRegister from './Components/ClientRegister'
import AddWallet from './Components/AddWallet'
import PurchasePolicy from './Components/PurchasePolicy'
import ProcessClaim from './Components/ProcessClaim'
function App() {
  let BrowserRouter=createBrowserRouter([
    {
      path:"",
      element:<RootLayout />,
      children:[
        {
        path:"",
        element:<ClientRegister />
        },
        {
          path:"clientLogin",
          element:<ClientLogin/>
        },
       {
        path:"AddWallet",
        element:<AddWallet/>
       },
       {
        path:"purchase-policy",
        element:<PurchasePolicy/>
       },
       {
        path:"process-claim",
        element:<ProcessClaim/>
       }
        
    ]
    }
  ])
    
  return <RouterProvider router={BrowserRouter} />
}

export default App