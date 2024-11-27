import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';
import { Local } from '../environment/env';
import * as Yup from 'yup';
import React, { useEffect } from 'react';
import logo from "../Assets/title_logo.webp"; // Assuming you have a logo similar to the other components
import Footer from '../components/Footer'; // Ensure you include Footer for consistency

const Verify: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('OTP')) {
            navigate('/login');
        } else {
            toast.info("OTP sent Successfully");
        }

        return () => {
            localStorage.removeItem('OTP');
        };
    }, [navigate]);

    const OTP: any = localStorage.getItem("OTP");
    const email: any = localStorage.getItem("email");

    const verifyUser = async () => {
        const response = await api.put(`${Local.VERIFY_USER}`, { email });
        return response;
    }

    const validationSchema = Yup.object().shape({
        otp: Yup.string().required("OTP is required").test("OTP Matched", "OTP Mismatch", (value: string) => {
            return value === OTP;
        })
    });

    const verifyMutation = useMutation({
        mutationFn: verifyUser
    });

    const handleSubmit = (values: any) => {
        if (values.otp === OTP) {
            toast.success("OTP Matched");
            verifyMutation.mutate(email);
            navigate('/Login');
        } else {
            toast.error("Invalid OTP");
        }
    }

    return (
        <div className=''>
            <div className='flex h-screen'>
                <div className='w-1/2 bg-teal-500 flex items-center justify-center'>
                    <img src={logo} alt="Logo" />
                    <p className='text-white text-xl font-extrabold'>EYE REFER</p>
                </div>

                <div className='w-1/2 flex items-center justify-center'>
                    <div className="bg-white p-3 rounded shadow-md w-96">
                        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Account</h2>
                        <Formik
                            initialValues={{
                                otp: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                            {() => (
                                <Form className='p-8'>
                                    <div className="form-group mb-4">
                                        <label className="block text-sm font-medium mb-1">OTP:</label>
                                        <Field type="text" name="otp" className="form-control w-full p-2 border border-gray-300 rounded" />
                                        <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                    <button type="submit" className='w-full bg-teal-500 text-white py-2 rounded hover:bg-teal-600'>Submit</button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Verify;
