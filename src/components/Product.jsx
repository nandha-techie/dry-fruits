import { getProduct } from './Serviceapi';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import { addToCart } from '../reducer/cartSlice'

const Product = ()=>{
  const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const allCarts = useSelector((state) => state.allCart);
    //console.log(allCarts)

    const datalist = [];
    const apiProduct = async ()=>{
      const data =  await getProduct(id);
      //console.log(data)
      setProduct(data);
    }

    const addToBasket = ()=>{
      const itemToAdd = {
        id: product?.product_id,
        title: product?.heading_title,
        image: product?.popup,
        price: (product?.price.replace(/[^0-9]/g, "")),
        quantity: quantity
      };
      
      dispatch(addToCart(itemToAdd))
    }

    useEffect(()=>{
        apiProduct(); 
    },[])


    return (
        <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Ürün Resmi */}
        <div className="md:order-2">
          <img
            src={product?.popup}
            alt={product?.heading_title}
            className="w-full h-auto max-w-lg mx-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Ürün Detayları */}
        <div className="md:order-1">
          <h1 className="text-3xl font-bold mb-2">{product?.heading_title}</h1>
          <p className="text-gray-700 text-lg mb-4">{product?.description?.substr(0, 100)}</p>
          <div className='flex'>
            <p className="text-xl font-bold mb-4">
              Rating: {' '}
              <span
                style={{ color: product?.rating?.rate >= 4 ? 'green' : 'red' }}
              >
                {product?.rating?.rate}
              </span>
            </p>
            <p className='text-xl mb-4 ml-4'>Left: {product?.rating?.count}</p>
          </div>
          <div className="flex items-center">
            <button
              className="bg-gray-200 text-gray-600 px-4 py-1 rounded hover:bg-gray-300"
              onClick={()=>setQuantity(prevQty => prevQty > 1 ? prevQty - 1 : 1)}
            >
              -
            </button>
            <span className="mx-4">{quantity}</span>
            <button
              className="bg-gray-200 text-gray-600 px-4 py-1 rounded-lg hover:bg-gray-300"
              onClick={()=>setQuantity(prevQty => prevQty + 1)}
            >
              +
            </button>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4 mt-4" // mt-4 ekleyin
            onClick={addToBasket}
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
    )
}

export default Product;