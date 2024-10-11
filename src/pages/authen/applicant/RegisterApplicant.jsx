import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";

const RegisterApplicant = () => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/authen/register/applicant/', {
            email: email,
            username: username,
            password: password,
            confirm_password: confirmPassword
        });
        toast.success('ลงทะเบียนสำเร็จ!');
        
        setTimeout(() => {
          navigate('/login/applicant/');
        }, 1000);
        console.log(response.data);
    } catch (error) {
        toast.error(error.response.data.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
    }
  };
  
  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg mb-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            ลงทะเบียนสำหรับผู้สมัครงาน
          </h2>
          <form onSubmit={handleSubmit}>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">ชื่อผู้ใช้</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">อีเมล</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">รหัสผ่าน</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="input input-bordered w-full" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">ยืนยันรหัสผ่าน</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="input input-bordered w-full" />
            </div>

            <button className="btn btn-warning w-full">ลงทะเบียน</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterApplicant;
