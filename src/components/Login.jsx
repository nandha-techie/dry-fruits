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
            <div>
                <form onSubmit={ handleSubmit }>
                    
                    <div>
                        <label htmlFor="email" className="">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            className="border border-gray-300"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email ? (
                            <small className="">
                              {errors.email}
                            </small>
                          ) : null}
                    </div> 
                    <div className="col text-left">
                          <label htmlFor="password" className="form-label">
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
                            <small className="text-danger mt-1">
                              {errors.password}
                            </small>
                          ) : null}
                    </div>
                    <div>
                      <Link to="/signup">New customer</Link>
                    </div>
                    <div>
                      <button type="submit" className="bg-gray-300 p-2">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;