import React from "react";
import { useFormik } from "formik";
import { registrationSchema } from "./RegistrationSchema";
import bcrypt from 'bcryptjs';
import { register } from './Serviceapi';

const initialValues = {
    username: "",
    email: "",
    repassword: "",
    password: "",
  };

const Signup = ()=>{
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
        validationSchema: registrationSchema,
        onSubmit: async (values, action) => {
          values.password = bcrypt.hashSync(values.password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
          
          const res = await register(values)

          if(res.data.user_existing_status){
            action.setFieldError('email', 'Email already existing');
          }
          
          //action.resetForm();
        },
      });

    return(
        <>
            <div className="w-1/4 shadow shadow-sky-200 flex justify-center mx-auto my-10">
                <form onSubmit={ handleSubmit } className="p-5">
                    <div className="mb-2">
                        <label htmlFor="username" className="block mb-1">
                                Username
                            </label>
                        <input
                        id="username"
                        name="username"
                        className="border border-gray-300 mb-1"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.username && touched.username ? (
                            <small className="block text-red-500">
                              {errors.username}
                            </small>
                          ) : null}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email" className="block mb-1">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            className="border border-gray-300 mb-1"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email ? (
                            <small className="block text-red-500">
                              {errors.email}
                            </small>
                          ) : null}
                    </div> 
                    <div className="mb-2">
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
                            <small className="block text-red-500">
                              {errors.password}
                            </small>
                          ) : null}
                        </div>
                        <div className="mb-2">
                          <label htmlFor="repassword" className="block mb-1">
                            Confirm Password
                          </label>
                          <input
                            id="repassword"
                            name="repassword"
                            className="border border-gray-300 mb-1"
                            value={values.repassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                          />
                          {errors.repassword && touched.repassword ? (
                            <small className="block text-red-500">
                              {errors.repassword}
                            </small>
                          ) : null}
                        </div>   
                    <div>
                      <button type="submit" className="bg-sky-400 hover:bg-sky-500 rounded text-white py-1 px-2 mt-2">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;