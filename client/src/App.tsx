import react from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPatient from './pages/AddPatient';
import DoctorList from './pages/DoctorList';
import StaffList from './tempPages/StaffList';
import AddStaff from './tempPages/AddStaff';
import Signup from './pages/Signup'
import Verify from './pages/Verify'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AddAddress from './pages/AddAddress'
import AddAppointment from './pages/AddAppointment';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import Chat from './pages/Chat';
import PatientListOD from './components/PatientListOD';
import PatientListMD from './components/PatientListMD';
import ViewAppointments from './pages/ViewAppointments';
import ViewPatient from './pages/ViewPatient';
import EditPatient from './pages/EditPatient';

const  App:react.FC = () => {

  const router = createBrowserRouter([
    {
      path:'/',
      element: <Signup />
    },
    {
      path:'/signup',
      element: <Signup />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/verify',
      element: <Verify />
    },
    {
      path:'/',
      element: <Layout/>,
      children:[
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/patient-od',
          element: <PatientListOD />
        },
        {
          path: '/patient-md',
          element: <PatientListMD />
        },
        {
          path: '/add-patient',
          element: <AddPatient />
        },
        {
          path: '/doctor',
          element: <DoctorList />
        },
        {
          path: '/staff',
          element: <StaffList />
        },
        {
          path: '/add-staff',
          element: <AddStaff />
        },
        {
          path: '/add-address',
          element: <AddAddress />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/add-appointment',
          element: <AddAppointment />
        },
        {
          path: '/chat/:id',
          element: <Chat />
        },
        {
          path: '/chat',
          element: <Chat />
        },
        {
          path: '/view-appointments',
          element: <ViewAppointments />
        },
        {
          path: '/view-doctors',
          element: <DoctorList />
        },
        {
          path: '/view-patient/:id',
          element: <ViewPatient />
        },
        {
          path: '/edit-patient/:id',
          element: <EditPatient />
        },
      ]
    }
  ]
)
  return (
<>
<RouterProvider router={router} />
<ToastContainer newestOnTop={false}
closeOnClick />
</>
  )
}

export default App
