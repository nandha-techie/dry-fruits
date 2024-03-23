import { RouterProvider, createBrowserRouter, Routes, Route } from "react-router-dom";
import Product from './components/Product';
import CartDetail from './components/CartDetail';
import Checkout from './components/Checkout';
import Home from './pages/Home';
import Productslist from './components/Productslist';
import Login from './components/Login';
import './App.css'
import Signup from './components/Signup';

function App() {
  
 const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children:[
      {
        path: "/",
        element: <Productslist />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "cart",
        element: <CartDetail />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ]
  },
  
]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
  
}

export default App
