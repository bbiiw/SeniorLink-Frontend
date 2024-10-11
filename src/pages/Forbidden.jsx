import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <div className="text-red-500 mb-4">
          <FaExclamationTriangle className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">403 Forbidden</h1>
        <p className="text-gray-600 mb-8">คุณไม่มีสิทธิ์เข้าถึงหน้านี้</p>
        <Link to="/">
          <button className="btn btn-error w-full">กลับสู่หน้าแรก</button>
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
