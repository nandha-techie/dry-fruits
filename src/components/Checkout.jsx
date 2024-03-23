import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,  useDispatch } from "react-redux";
import { getTotal } from '../reducer/cartSlice'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { paymentApi } from './Serviceapi';
import Paymentpage from "./Paymentpage";
import "./Checkoutform.css";

const stripePromise = loadStripe("pk_test_51Om68YSCHyptIufXPRKb0wT7cqCVxYIaB0HJqNeTVNNgx4SicD2ng1ENtKLueGgyWpSt5lKGOanzHlYgxZJafyOL00zztUsSCe");

export default function Checkout() {
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");
  const dispatch = useDispatch();
  dispatch(getTotal());
  const cartData = useSelector((state)=> state.allCart);

  const backendApi = async ()=>{
      const res = await paymentApi({ items: [{ id: "xl-tshirt" }], total: cartData.totalAmount });

      if(!res.data.user_login){
        console.log(res);
        navigate('/login');
      }

      setClientSecret(res.data.client_secret)
  }

  useEffect(() => {
    backendApi();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };
 
  return (
    <div className="App">
      {clientSecret && (
        
        <Elements options={options} stripe={stripePromise}>
          <Paymentpage />
        </Elements>
      )}
    </div>
  );
}