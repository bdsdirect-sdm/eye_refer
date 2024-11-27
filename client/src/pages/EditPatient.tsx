import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Local } from '../environment/env';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required('First Name is required'),
  lastname: Yup.string().required('Last Name is required'),
  disease: Yup.string().required("Disease is required"),
  referedto: Yup.string().required("Select Doctor"),
  // address: Yup.string().required("Address is required"),
  referback: Yup.string().required("Please select an option"),
  medicaldocs: Yup.mixed()
  .required("Medical documents are required")
  // .test("fileType", "Only pdf, .png and .jpeg files are allowed"
  //   ,(value: any) => {
  //   return value && ["image/png", "image/jpeg", "application/pdf"].includes(value.type);
  // })
,
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

const EditPatient: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { id } = useParams();

  const [initialData, setInitialData] = useState({

  });

  useEffect(() => {
    if (!token) navigate('/login');
    // navigate("/dashboard");
  }, [navigate, token]);

  const fetchPatient = async() => {
    
    try{
        
      const response = await api.get(`${Local.VIEW_PATIENT}/${id}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(err){
      toast.error(`${err}`);
    }
  }
 
  const { data: Patient, error, isLoading, isError } = useQuery({
    queryKey: ['patient'],
    queryFn: fetchPatient
  })

  const addPatient = async (data: any) => {
    console.log("Data for API", data);
    try {
      const response = await api.post(`${Local.ADD_PATIENT}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Patient referred successfully");
      if (localStorage.getItem('token')) {
        navigate("/dashboard");
    }
      return;
    } catch (err: any) {
      toast.error(`${err.response?.data?.message || 'Error occurred'}`);
      return;
    }
  };

  const patientMutate = useMutation({
    mutationFn: addPatient
  });

  const referPatientHandler = (values: any) => {
    console.log("TEST::::::", values)
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    // console.log("TEST::::::", values)
    // console.log("Userrrrrrr", formData)
    patientMutate.mutate(values);
  };

  function handleFileChange(e: any, setFieldValue: any)  {
    setFieldValue(
      "medicaldocs",
      e.currentTarget.files ? e.currentTarget.files[0] : null
    );
  }

  const fetchDocs = async () => {
    try {
      const response = await api.get(`${Local.GET_DOC_LIST}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Data---->", response.data);
      return response.data;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error fetching doctor list');
    }
  };

  const { data: MDList } = useQuery({
    queryKey: ["MDList"],
    queryFn: fetchDocs,
  });

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
    return (
      <div>Error: {error?.message || 'Error loading data'}</div>
    );
  }
  console.log()

  return (
    <div>
      <Formik
        initialValues={{
          dob: Patient?.patientData?.dob,
          email: Patient?.patientData?.email,
          phone: Patient?.patientData?.phone,
          firstname: Patient?.patientData?.firstname,
          lastname: Patient?.patientData?.lastname,
          gender: Patient?.patientData?.gender,
          disease: Patient?.patientData?.disease,
          laterality: Patient?.patientData?.laterality,
          referback: Patient?.patientData?.referback,
          timing: Patient?.patientData?.timing,
          referedto: Patient?.patientData?.referedto,
          address: Patient?.patientData?.address,
          medicaldocs: File || null,
          notes: Patient?.patientData?.notes
        }}
        validationSchema={validationSchema}
        onSubmit={referPatientHandler}
      >
        {({ values, setFieldValue }) => (
          <Form>
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">DOB:</label>
              <Field
                type="date"
                name="dob"
                placeholder="Enter DOB"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="dob" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="form-group">
              <label className="block mb-1">Email:</label>
              <Field
                type="text"
                name="email"
                placeholder="Enter Email Address"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="form-group">
              <label className="block mb-1">Phone:</label>
              <Field
                type="text"
                name="phone"
                placeholder="Enter Phone"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
            </div>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">First Name:</label>
              <Field
                type="text"
                name="firstname"
                placeholder="Enter First Name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="firstname" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="form-group">
              <label className="block mb-1">Last Name:</label>
              <Field
                type="text"
                name="lastname"
                placeholder="Enter Last Name"
                className="w-full border border-gray-300 rounded-md p-2"
              />
              <ErrorMessage name="lastname" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="form-group">
              <label className="block mb-1">Gender:</label>
              <Field as="select" name="gender" className="w-full border border-gray-300 rounded-md p-2">
                <option value="" disabled>Select</option>
                {['Male', 'Female', 'Others'].map((gender) => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 mt-1" />
            </div>
          </div>
        
          <h2 className="text-xl font-semibold mb-4">Reason of Consult</h2>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">Disease:</label>
              <Field as="select" name="disease" className="w-full border border-gray-300 rounded-md p-2">
                <option value="" disabled>Select</option>
                {['Cataract', 'Medical', 'Keratoconus', 'Corneal, non-keratoconus', 'Other'].map((disease) => (
                  <option key={disease} value={disease}>{disease}</option>
                ))}
              </Field>
              <ErrorMessage name="disease" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="form-group">
              <label className="block mb-1">Laterality:</label>
              <Field as="select" name="laterality" className="w-full border border-gray-300 rounded-md p-2">
                <option value="" disabled>Select</option>
                {['Left', 'Right', 'Both'].map((laterality) => (
                  <option key={laterality} value={laterality}>{laterality}</option>
                ))}
              </Field>
              <ErrorMessage name="laterality" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="mb-3">
              <label className="block mb-1">Return back to referer:</label>
              <div className="flex items-center">
                <label className="mr-4">
                  <Field name="referback" type="radio" value="1" /> Yes
                </label>
                <label>
                  <Field name="referback" type="radio" value="0" /> No
                </label>
                <ErrorMessage name="referback" component="div" className="text-red-500 mt-1" />
              </div>
            </div>
          </div>
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="form-group">
              <label className="block mb-1">Timing:</label>
              <Field as="select" name="timing" className="w-full border border-gray-300 rounded-md p-2">
                <option value="" disabled>Select</option>
                {['Routine (Within 1 month)', 'Urgent (Within 1 week)', 'Emergent (Within 24 hours or less)'].map((timing) => (
                  <option key={timing} value={timing}>{timing}</option>
                ))}
              </Field>
              <ErrorMessage name="timing" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="form-group">
              <label className="block mb-1">MD Name:</label>
              <Field as="select" name="referedto" className="w-full border border-gray-300 rounded-md p-2">
                <option value="" disabled>Select</option>
                {MDList?.docList?.map((md: any) => (
                  <option key={md.uuid} value={md.uuid}>{md.firstname} {md.lastname}</option>
                ))}
              </Field>
              <ErrorMessage name="referedto" component="div" className="text-red-500 mt-1" />
            </div>
        
            <div className="form-group">
              <label className="block mb-1">Location:</label>
              <Field as="select" name="address" className="w-full border border-gray-300 rounded-md p-2">
                <option value="" disabled>Select</option>
                {values.referedto && MDList.docList.find((md: any) => md.uuid === values.referedto)?.Addresses.map((address: any) => (
                  <option key={address.uuid} value={address.uuid}>{address.street} {address.district} {address.city} {address.state}</option>
                ))}
              </Field>
              <ErrorMessage name="address" component="div" className="text-red-500 mt-1" />
            </div>
          </div>
        
          <div className="form-group mb-4">
            <label className="block mb-1">Medical documents:</label>
            <input
              type="file"
              name="medicaldocs"
              className="mt-1 block w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              onChange={(e) => handleFileChange(e, setFieldValue)}
            />
            <ErrorMessage name="medicaldocs" component="div" className="text-red-500 mt-1" />
          </div>
        
          <div className="form-group mb-4">
            <label className="block mb-1">Notes:</label>
            <Field
              as="textarea"
              name="notes"
              placeholder=""
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <ErrorMessage name="notes" component="div" className="text-red-500 mt-1" />
          </div>
        
          <div className="flex justify-between">
            <button type="submit" className="btn btn-outline-primary bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
              Save as Draft
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => { navigate("/dashboard"); }}
            >
              Cancel
            </button>
          </div>
        </Form>
        
        )}
      </Formik>
    </div>
  );
};

export default EditPatient;