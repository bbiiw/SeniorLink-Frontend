import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "../../../components/Navbar";

const LoginCompany = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/authen/login/company/', {
        email: email,
        password: password
      });
      const username = response.data.data.username;
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'company');
      localStorage.setItem('username', username);
      toast.success('เข้าสู่ระบบสำเร็จ!');
      console.log(response.data);

      setTimeout(() => {
        navigate('/company/profile');
        toast.success('ยินดีต้อนรับเข้าสู่หน้าบริษัท', { duration: 3000 });
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm bg-white p-8 mb-32 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">
            เข้าสู่ระบบสำหรับบริษัท
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">อีเมล</label>
              <input
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">รหัสผ่าน</label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="btn btn-warning w-full">เข้าสู่ระบบ</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginCompany;
