import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Local } from '../environment/env';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';
// Validation schema using Yup
const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  disease: Yup.string().required("Disease is required"),
  referedto: Yup.string().required("Select Doctor"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});
const EditAppointment: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [appointmentData, setAppointmentData] = useState<any>(null);
  useEffect(() => {
    if (!token) navigate('/login');
  }, [navigate, token]);
  // Fetch the appointment details
  const fetchAppointment = async () => {
    try {
      const response = await api.get(`${Local.VIEW_APPOINTMENT}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      toast.error('Error fetching appointment data');
    }
  };
  const { data: appointment, error, isLoading, isError } = useQuery({
    queryKey: ['appointment', id],
    queryFn: fetchAppointment,
  });
  const updateAppointment = async (data: any) => {
    try {
      const response = await api.put(`${Local.EDIT_APPOINTMENT}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Appointment updated successfully');
      navigate('/appointments');  // Redirect to the appointments list
    } catch (err) {
      toast.error('Error updating appointment');
    }
  };
  const mutation = useMutation(updateAppointment);
  const handleSubmit = (values: any) => {
    mutation.mutate(values);
  };
  if (isLoading) {
    return (
      <div>
        <div>Loading...</div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    return <div>Error: {error?.message || 'Error loading data'}</div>;
  }
  return (
    <div>
      <Formik
        initialValues={{
        //   firstname: appointment?.patient.firstname || '',
        //   lastname: appointment?.patient.lastname || '',
        //   disease: appointment?.disease || '',
        //   referedto: appointment?.doctor?.id || '',
        //   phone: appointment?.patient.phone || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <h2 className="text-xl font-semibold mb-4">Edit Appointment</h2>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">First Name:</label>
              <Field
                type="text"
                name="firstname"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="firstname" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="form-group">
              <label className="block mb-1">Last Name:</label>
              <Field
                type="text"
                name="lastname"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="lastname" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="form-group">
              <label className="block mb-1">Disease:</label>
              <Field
                type="text"
                name="disease"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="disease" component="div" className="text-red-500 mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">Phone:</label>
              <Field
                type="text"
                name="phone"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="btn btn-outline-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => navigate('/appointments')}
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
export default EditAppointment;