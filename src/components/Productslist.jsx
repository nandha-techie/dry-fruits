import Productcard from "./Productcard";
import { allProducts, paymentApi } from './Serviceapi';
import { useEffect, useState } from "react";

const Productslist = ()=>{
    const [products, setProducts] = useState([]);

    const datalist = [];
        const apiProducts = async ()=>{
        const data =  await allProducts();
        setProducts(data.products);
    }

    useEffect(()=>{
        apiProducts(); 
    },[])

    return(
        <div className="w-11/12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-y-10 mt-4 justify-self-center">
            { 
                products.map((list, index) =>(
                    <Productcard key={index} { ...list } />
                ))
            }
        </div>
    )
}

export default Productslist;