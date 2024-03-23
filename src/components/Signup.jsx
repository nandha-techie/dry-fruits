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
            <div>
                <form onSubmit={ handleSubmit }>
                    <div>
                        <label htmlFor="username" className="">
                                Username
                            </label>
                        <input
                        id="username"
                        name="username"
                        className="border border-gray-300"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        />
                        {errors.username && touched.username ? (
                            <small className="">
                              {errors.username}
                            </small>
                          ) : null}
                    </div>
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
                        <div className="col text-left">
                          <label htmlFor="repassword" className="form-label">
                            Confirm Password
                          </label>
                          <input
                            id="repassword"
                            name="repassword"
                            className="border border-gray-300"
                            value={values.repassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                          />
                          {errors.repassword && touched.repassword ? (
                            <small className="text-danger mt-1">
                              {errors.repassword}
                            </small>
                          ) : null}
                        </div>   
                    <div>
                      <button type="submit" className="bg-gray-300 p-2">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup;