import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Local } from '../environment/env';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
import Footer from '../components/Footer';
import logo from "../Assets/title_logo.webp";

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const doctype = localStorage.getItem("doctype");
      navigate("/dashboard");
  }
  }, []);

  const authUser = async (loginData: any) => {
    try {
      const response: any = await api.post(`${Local.LOGIN_USER}`, loginData);
      console.log("Hello", response);
      if (response.status === 200) {
        if (response.data.user.is_verified) {
          const doctype = response.data.user.doctype;
          localStorage.setItem("doctype", doctype);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.user.firstname + " " + response.data.user.lastname);
          localStorage.setItem("doctor",JSON.stringify(response.data.user));
          
          toast.success("Login Successfully");
          navigate("/dashboard");
          
        } else {
          localStorage.setItem("email", response?.data?.user?.email);
          localStorage.setItem("OTP", response.data.OTP);
          toast.warn("User not Verified");
          navigate("/verify");
        }
        return response;
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      return;
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[`~!@#$%^&*()"?<>|:{}(),.]/, "Password must contain at least one special character")
  });

  const loginMutate = useMutation({
    mutationFn: authUser,
  });

  const loginSubmit = async (values: any) => {
    loginMutate.mutate(values);
  }

  return (<>

    <div className=''>
    <div className='flex h-screen'>
      <div className='w-1/2 bg-gradient-to-b from-customGreen 
        to-teritory flex items-center justify-center'>
        <img src={logo} alt="Logo"></img>
        <p className='text-white text-xl font-extrabold'>EYE REFER</p>
      </div>
      
      <div className='w-1/2 flex items-center justify-center'>
        <div className="bg-white p-3 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={loginSubmit}>
            {() => (
              <Form className='p-8'>
                <div className="form-group mb-4">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Field name="email" type="email" placeholder="Enter your Email" className="form-control w-full p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <div className="form-group mb-4">
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <Field name="password" type="password" placeholder="Enter your Password" className="form-control w-full p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>
                <button type="submit" className='w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600'>Login</button>
              </Form>
            )}
          </Formik>
          <Link to={'/signup'} className="block text-center mt-4 text-sm text-teal-500 hover:underline">Don't have an Account?</Link>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
    
    </>
  )
}

export default Login;
