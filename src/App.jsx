import React from 'react';
import Home from './pages/Home';
import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Forbidden from './pages/Forbidden';
import RegisterApplicant from './pages/authen/applicant/RegisterApplicant';
import RegisterCompany from './pages/authen/company/RegisterCompany';
import LoginApplicant from './pages/authen/applicant/LoginApplicant';
import LoginCompany from './pages/authen/company/LoginCompany';

// applicant pages
import SearchJobs from './pages/SearchJobs';
import EditProfile from './pages/applicant/EditProfile';
import ProfilePage from './pages/applicant/ProfilePage';
import MyJobs from './pages/applicant/MyJobs';
import ProfileCompany from './pages/applicant/ProfileCompany';

// company pages
import CompanyProfile from './pages/company/CompanyProfile';
import CompanyInfo from './pages/company/CompanyInfo';
import JobList from './pages/company/JobList';
import JobForm from './pages/company/JobForm';
import ApplicationManagement from './pages/Company/ApplicationManagement';
import Unauthorized from './pages/Unauthorized';
import ApplicantProfile from './pages/company/ApplicantProfile';

// เปิดใช้การส่งคุกกี้ไปกับคำขอ (สำหรับ CSRFToken)
axios.defaults.withCredentials = true;

// แนบ Token และ CSRFToken ไปกับทุกคำขอโดยใช้ axios interceptor (สำหรับ request)
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const csrfToken = Cookies.get('csrftoken');

    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }

    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// จัดการ response errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403) {
      window.location.href = '/forbidden';

    } if (error.response.status === 401) {
      window.location.href = '/unauthorized';
    }
    return Promise.reject(error);
  }
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* error */}
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* register & login */}
        <Route path="/" element={<SearchJobs />} />
        <Route path="/register/applicant" element={<RegisterApplicant />} />
        <Route path="/register/company" element={<RegisterCompany />} />
        <Route path="/login/applicant" element={<LoginApplicant />} />
        <Route path="/login/company" element={<LoginCompany />} />

        {/* applicant */}
        <Route path="/jobs" element={<SearchJobs />} />
        <Route path="/applicant/profile" element={<ProfilePage />} />
        <Route path="/applicant/edit" element={<EditProfile />} />
        <Route path="/applicant/my-jobs" element={<MyJobs />} />
        <Route path="/company/profile/:companyId" element={<ProfileCompany />} />

        {/* company */}
        <Route path="/company/profile" element={<CompanyProfile />} />
        <Route path="/company/edit" element={<CompanyInfo />} />
        <Route path="/company/job-list" element={<JobList />} />
        <Route path="/company/job-form" element={<JobForm />} />
        <Route path="/company/job-form/:id" element={<JobForm />} />
        <Route path="/company/applications" element={<ApplicationManagement />} />
        <Route path="/company/applications/profile/:applicantId" element={<ApplicantProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;