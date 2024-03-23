import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import {useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { getTotal } from '../reducer/cartSlice';
import Logo from '../assets/logo.png';

const Navbar = ()=>{
    const stateData = useSelector(state=> state.allCart);
    const user_details = JSON.parse(localStorage.getItem('user'));
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getTotal());
    }, [stateData.carts, dispatch])

    return(
        <>
            <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-20 items-center justify-between">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5"></span>
                                <span className="sr-only">Open main menu</span>
                            </button>
                        </div>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                            <Link to=""><img className="h-8 w-auto" src={Logo} alt="Your Company" /></Link> 
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <Link to="" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">Home</Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Link to="cart" className="relative top-0 right-0 text-white pr-2 pt-1 mr-2"><FaShoppingCart /><span className="w-5 text-center absolute -right-1 -top-5 bg-red-600  rounded-full">{stateData.totalQuantity > 0 ? stateData.totalQuantity : ''}</span></Link>
                            
                            {
                                (user_details) 
                                ? <Link className="text-white">{ user_details.username }</Link> 
                                : <Link to="login" className="text-white">Sign in</Link>
                            }
                            
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;