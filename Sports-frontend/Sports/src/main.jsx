import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css'
import Sports from './components/Sports.jsx'
import Women from './components/Women.jsx'
import Register from './components/Register.jsx';
import Login from './components/Login.jsx'
import Men from './components/Men.jsx';
import Kid from './components/Kid.jsx'
import ShoppingCart from './components/ShoppingCart.jsx'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PaymentPage from './components/PaymentPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>  
  },
  {
    path: "/signin" ,
    element: <Login/>  
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/men",
    element: <Men/>
  },
  {
    path:"/sport",
    element: <Sports/>
  },
  {
    path: "/kid",
    element: <Kid/>
  },
  {
    path:"/women",
    element: <Women/>
  },
  {
    path:"/shopping",
    element: <ShoppingCart/>
  },
  {
    path:"/payment",
    element:<PaymentPage/>
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
<RouterProvider router={router}/>
)
