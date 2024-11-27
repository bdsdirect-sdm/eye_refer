import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Local } from '../environment/env';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
import React, { useEffect } from 'react';

const validationSchema = Yup.object().shape({
  street: Yup.string().required('Street is required'),
  district: Yup.string().required('District is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  phone: Yup.string().required('Phone number is required'),
  pincode: Yup.number().required('Pincode is required'),
});



const AddAddress: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const addAddress = async (data: any) => {
    try {
      const response = await api.post(`${Local.ADD_ADDRESS}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err: any) {
      toast.error(`${err.response.data.message}`);
    }
  };

  const addressMutation = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      toast.success('Address Saved');
      navigate('/dashboard');
    },
  });

  const addressHandler = (values: any) => {
    addressMutation.mutate(values);
    console.log('Address Saved------->', addressMutation.data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Add Address</h1>
        <Formik
          initialValues={{
            street: '',
            district: '',
            state: '',
            city: '',
            phone: '',
            pincode: '',
          }}
          validationSchema={validationSchema}
          onSubmit={addressHandler}
        >
          {() => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Street</label>
                <Field
                  type="text"
                  name="street"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="street" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">District</label>
                <Field
                  type="text"
                  name="district"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="district" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">State</label>
                <Field
                  type="text"
                  name="state"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="state" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">City</label>
                <Field
                  type="text"
                  name="city"
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="city" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  maxLength={10}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Pincode</label>
                <Field
                  type="text"
                  name="pincode"
                  maxLength={6}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                <ErrorMessage name="pincode" component="div" className="text-red-500 mt-1" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddAddress;
