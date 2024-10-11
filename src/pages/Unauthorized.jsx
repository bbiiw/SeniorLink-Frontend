import React from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-yellow-500 mb-4">
          <FaLock className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">401 Unauthorized</h1>
        <p className="text-gray-600 mb-8">คุณไม่มีสิทธิ์ในการเข้าถึงหน้านี้ โปรดเข้าสู่ระบบก่อน</p>
        <Link to="/">
          <button className="btn btn-warning w-full">กลับสู่หน้าแรก</button>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
