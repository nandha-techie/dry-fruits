import axios from "axios";
import AuthHeader from './AuthHeader';
import { email } from './AuthHeader';

const token = AuthHeader();
const email_id = email();
const baseurl = axios.create({
  baseURL: 'http://localhost:8080/',
}); 
  
export const allProducts = ()=>{
    return baseurl.get('dev/op_v4.0.2.2/index.php?route=product/category.productApi&path=20')
    .then(res => res.data)
    .then((json) => json);
}

export const getProduct = (id)=>{
  return baseurl.get(`dev/op_v4.0.2.2/index.php?route=product/product.productDetail&product_id=${id}`, 

  )
  .then(res => res.data)
  .then((json) => json);
}

export const paymentApii = (data)=>{
  return axios.post('http://localhost:4242/create-payment-intent', data,{
    
    headers: { "Content-Type": "application/json", token },
  }
  )
  .then(res => res);
}

export const paymentApi = (data)=>{
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.headers.post['Authorization'] = token;

  return axios({
    url: 'http://localhost:8080/dev/op_v4.0.2.2/index.php?route=product/payment.write',
    method: 'POST',
    data: { ...data, email: email_id }
    });
}

export const register = (data)=>{
  //console.log(data)
  
  return baseurl.post('/dev/op_v4.0.2.2/index.php?route=product/payment.signup', {...data,repassword: '' },
    { headers: { "Content-Type": "application/x-www-form-urlencoded" }, }
    ).then(res => res);
}

export const loginApi = (data)=>{
  //console.log(data)
  
  return baseurl.post('/dev/op_v4.0.2.2/index.php?route=product/payment.loginApi', {...data },
    { headers: { "Content-Type": "application/x-www-form-urlencoded" }, }
    ).then(res => res); 
}
 
const ServiceApi = ()=>{
    
}

export default ServiceApi;