interface config{
    BASE_URL: string;
    CREATE_USER: string;
    VERIFY_USER: string;
    LOGIN_USER: string;
    GET_USER: string;
    GET_DOC_LIST: string;
    GET_PATIENT_LIST: string;
    ADD_PATIENT: string;
    ADD_ADDRESS: string;
    ADD_APPOINTMENT: string
    GET_REFERRED_PATIENT_LIST: string;
    VIEW_APPOINTMENTS: string;
    UPDATE_APPOINTMENT_STATUS: string;
    VIEW_DOCTORS: string;
    VIEW_PATIENT: string;
    GET_CHATBAR: string;
    GET_CHATDATA: string;
    VIEW_APPOINTMENT: string;
    EDIT_APPOINTMENT: string;
}

export const Local:config = {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    CREATE_USER: import.meta.env.VITE_CREATE_USER,
    VERIFY_USER: import.meta.env.VITE_VERIFY_USER,
    LOGIN_USER: import.meta.env.VITE_LOGIN_USER,
    GET_USER: import.meta.env.VITE_GET_USER,
    GET_DOC_LIST: import.meta.env.VITE_GET_DOC_LIST,
    GET_PATIENT_LIST: import.meta.env.VITE_GET_PATIENT_LIST,
    ADD_PATIENT: import.meta.env.VITE_ADD_PATIENT,
    ADD_ADDRESS: import.meta.env.VITE_ADD_ADDRESS,
    ADD_APPOINTMENT: import.meta.env.VITE_ADD_APPOINTMENT,
    GET_REFERRED_PATIENT_LIST: import.meta.env.VITE_GET_REFERRED_PATIENT_LIST,
    VIEW_APPOINTMENTS: import.meta.env.VITE_VIEW_APPOINTMENTS,
    UPDATE_APPOINTMENT_STATUS: import.meta.env.VITE_UPDATE_APPOINTMENT_STATUS, 
    VIEW_DOCTORS: import.meta.env.VITE_VIEW_DOCTORS,
    VIEW_PATIENT: import.meta.env.VITE_VIEW_PATIENT,
    GET_CHATBAR: import.meta.env.VITE_GET_CHATBAR,
    GET_CHATDATA: import.meta.env.VITE_GET_CHATDATA,
    VIEW_APPOINTMENT: import.meta.env.VITE_VIEW_APPOINTMENT,
    EDIT_APPOINTMENT: import.meta.env.VITE_EDIT_APPOINTMENT
    
}