import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const JobDetail = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle applying for a job
  const handleApply = async () => {
    const token = localStorage.getItem('token'); // เข้าสู่ระบบแล้วหรือยัง?
    if (!token) {
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการสมัครงาน");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/apply/${job.id}/`);
      toast.success(response.data.message || "สมัครงานสำเร็จแล้ว");
      console.log(response.data);
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครงาน");
    }
  };

  return (
    <div className="card bg-white shadow-md p-6">
      <div className="relative">
        <img
          src={job.company.background_image 
            ? `http://localhost:8000${job.company.background_image}` 
            : "https://via.placeholder.com/1000x200"}
          alt="company building"
          className="rounded-md mb-4 h-40 w-full object-cover"
        />
      </div>
      <div className="mb-4">
        <h2 className="font-bold text-2xl mt-4">{job.title}</h2>
        
        {/* Duration with clock icon */}
        <div className="text-md text-gray-500 mt-4 flex items-center">
          <FaClock className="mr-2" />
          <span>ระยะเวลาฝึกงาน {job.duration}</span>
        </div>
        
        {/* Start and End Date with calendar icon */}
        <div className="text-md text-gray-500 mt-2 flex items-center">
          <FaCalendarAlt className="mr-2" />
          <span>ฝึกงานตั้งแต่วันที่ {job.start_date} - {job.end_date}</span>
        </div>
        
        <div className="flex items-center text-md mt-2">
          <FaMapMarkerAlt className="text-gray-500 mr-1" />
          <span className="text-gray-700">{job.location}</span>
        </div>
        <div className="flex space-x-4 mt-4">
          {job.myskills.map((skill, index) => (
            <span key={index} className="badge badge-secondary">{skill.name}</span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg">รายละเอียดงาน</h3>
        <div 
          className="text-md mt-2" 
          dangerouslySetInnerHTML={{ __html: job.description }} 
        />
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-lg">เกี่ยวกับบริษัท</h3>
        <Link to={`/company/profile/${job.company.id}`}>
          <div className="flex items-center space-x-4 mt-2 p-2 max-w-xs transition duration-300 ease-in-out hover:bg-slate-100 hover:rounded-lg">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={`http://localhost:8000${job.company.logo}` || "https://via.placeholder.com/150"}
                  alt="company logo"
                />
              </div>
            </div>
            <div>
              <p className="font-bold">{job.company.name}</p>
              <p className="text-sm text-gray-500">{job.company.category.category_name}</p>
            </div>
          </div>
        </Link>
      </div>

      <button className="btn btn-primary w-full" onClick={() => setIsModalOpen(true)}>สมัครงาน</button>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center text-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">ยืนยันการสมัครงาน</h3>
            <p className="mb-4">คุณแน่ใจหรือไม่ว่าต้องการสมัครงานนี้?</p>
            <div className="flex space-x-4 justify-center">
              <button className="btn btn-primary" onClick={handleApply}>ยืนยัน</button>
              <button className="btn btn-outline btn-error" onClick={() => setIsModalOpen(false)}>ยกเลิก</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
