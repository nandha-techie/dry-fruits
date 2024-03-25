import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "./RegistrationSchema";
import bcrypt from 'bcryptjs';
import { loginApi } from './Serviceapi';

const initialValues = {
    email: "",
    password: "",
  };

const Login = ()=>{
const navigate = useNavigate();
const user_details = JSON.parse(localStorage.getItem('user'));

useEffect(()=>{
  if(user_details) navigate('/')
},[]);


    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      } = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, action) => {
          
          values.password = bcrypt.hashSync(values.password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
          
          const res = await loginApi(values)

          if(!res.data.existing_user_status){
            action.setFieldError('email', 'Email not found');
          }
          if(!res.data.user_status){
            action.setFieldError('password', 'Password incorrect');
          }else{
            localStorage.setItem("user", JSON.stringify({...res.data.user, access_token: res.data.access_token }));
            navigate("/");
          }
          
        },
      });

    return(
        <>
            <div className="w-1/4 shadow shadow-sky-200 flex justify-center mx-auto my-10">
                <form onSubmit={ handleSubmit }>
                    <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-4">Login</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="block mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            className="border border-gray-300 "
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{outlineWidth: '0.5px'}}
                          />
                          {errors.email && touched.email ? (
                            <small className="block text-red-500	mt-1">
                              {errors.email}
                            </small>
                          ) : null}
                    </div> 
                    <div className="mb-3">
                          <label htmlFor="password" className="block mb-1">
                            Password
                          </label>
                          <input
                            id="password"
                            name="password"
                            className="border border-gray-300"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                          />
                          {errors.password && touched.password ? (
                            <small className="block text-red-500 mt-1">
                              {errors.password}
                            </small>
                          ) : null}
                    </div>
                    <div className="mb-2 text-right">
                      <Link to="/signup" className="text-sky-600 text-base hover:text-sky-800">Or new customer</Link>
                    </div>
                    <div className="mb-4">
                      <button type="submit" className="bg-sky-400 hover:bg-sky-500 rounded text-white py-1 px-2">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;