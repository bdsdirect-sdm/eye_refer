import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { Local } from '../environment/env';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
import Footer from '../components/Footer'; 
import logo from "../Assets/title_logo.webp";

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const dt = localStorage.getItem("doctype");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const doctype = localStorage.getItem("doctype");
            navigate("/dashboard");
        }
    }, [navigate]);
    console.log("USERRRRRRRR============>", dt);
    const addUser = async (formData: any) => {
        try {
            const response = await api.post(`${Local.CREATE_USER}`, formData);
            console.log("Response--->", response.data);
            localStorage.setItem("email", formData.email);
            localStorage.setItem("OTP", response.data.OTP);
            toast.success(response.data.message);
            return response;
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
            return err;
        }
    }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        doctype: Yup.number().required("Select Doctor Type"),
        email: Yup.string().email("Invalid Email").required("Email is required"),
        password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(/[`~!@#$%^&*()"?<>|:{}(),.]/, "Password must contain at least one special character"),
        confirmPass: Yup.string().required("Confirm Password is required")
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    const signupMutation = useMutation({
        mutationFn: addUser,
        onSuccess: () => { 
            console.log("SUCCESSSSS")
            navigate("/verify"); }
    });

    const signupHandler = (values: any) => {
        const { confirmPass, ...data } = values;
        signupMutation.mutate(data);
    }

    return (
        <div className=''>
            <div className='flex h-screen'>
                <div className='w-1/2 bg-gradient-to-b from-customGreen 
        to-teritory flex items-center justify-center'>
                    <img src={logo} alt="Logo" />
                    <p className='text-white text-xl font-extrabold'>EYE REFER</p>
                </div>

                <div className='w-1/2 flex items-center justify-center overflow-auto'>
                    <div className="bg-white p-3 rounded shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                        <Formik
                            initialValues={{
                                firstname: '',
                                lastname: '',
                                doctype: '',
                                email: '',
                                password: '',
                                confirmPass: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={signupHandler}>
                            {() => (
                                <Form className='p-8'>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">First Name:</label>
                                        <Field type="text" name="firstname" className="form-control w-full p-2 border border-gray-300 rounded" />
                                        <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">Last Name:</label>
                                        <Field type="text" name="lastname" className="form-control w-full p-2 border border-gray-300 rounded" />
                                        <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">Doctor Type:</label>
                                        <Field as="select" name="doctype" className="form-control w-full p-2 border border-gray-300 rounded">
                                            <option value="" disabled>Select Doctor Type</option>
                                            <option value="1">MD</option>
                                            <option value="2">OD</option>
                                        </Field>
                                        <ErrorMessage name="doctype" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">Email:</label>
                                        <Field type="email" name="email" className="form-control w-full p-2 border border-gray-300 rounded" />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">Password:</label>
                                        <Field type="password" name="password" className="form-control w-full p-2 border border-gray-300 rounded" />
                                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">Confirm Password:</label>
                                        <Field type="password" name="confirmPass" className="form-control w-full p-2 border border-gray-300 rounded" />
                                        <ErrorMessage name='confirmPass' component="div" className='text-red-500 text-sm mt-1' />
                                    </div>
                                    <button type='submit' className='w-full bg-teritory text-white py-2 rounded hover:bg-teal-600'>Submit</button>
                                </Form>
                            )}
                        </Formik>
                        <Link to={'/login'} className="block text-center mt-4 text-sm text-teal-500 hover:underline">Already have an Account?</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;
