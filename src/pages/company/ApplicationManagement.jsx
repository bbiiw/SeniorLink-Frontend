import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaUser } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/company/applications/');
      console.log(response.data);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusChange = async (applicationId, newStatusId) => {
    try {
      await axios.put(`http://localhost:8000/applications/${applicationId}/`, { status: newStatusId });
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async (applicationId) => {
    try {
      await axios.delete(`http://localhost:8000/company/applications/${applicationId}/`);
      setApplications((prev) => prev.filter((app) => app.id !== applicationId));
      toast.success("ลบใบสมัครสำเร็จ");
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error("เกิดข้อผิดพลาดในการลบใบสมัคร");
    }
  };

  return (
    <div className="mx-auto bg-base-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 p-32">
        <h1 className="text-4xl font-bold mb-8 text-green-600">จัดการใบสมัคร</h1>

        {applications.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">ยังไม่มีการสมัคร</p>
        ) : (
          <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">

              {/* Left Section: Profile and Status */}
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 overflow-hidden rounded-full">
                  <img
                    src={app.applicant.profile_picture ? `http://localhost:8000${app.applicant.profile_picture}` : 'https://via.placeholder.com/50'}
                    alt={app.applicant.first_name}
                    className="object-cover w-full h-full"
                    />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">
                    {app.applicant.first_name} {app.applicant.last_name}
                  </h2>
                  <p className="text-gray-600">สมัครตำแหน่ง : {app.job.title}</p>
                  <span
                    className={`badge ${
                      app.status.name === 'ถูกปฏิเสธ'
                      ? 'badge-error'
                      : app.status.name === 'ผ่านการคัดเลือก'
                      ? 'badge-success'
                      : app.status.name === 'กำลังฝึกงาน'
                      ? 'badge-secondary'
                      : app.status.name === 'ฝึกงานเสร็จสิ้น'
                      ? 'badge-primary'
                      : 'badge-warning'
                      } mt-2`}
                      >
                    {app.status.name}
                  </span>
                </div>
              </div>

              {/* Right Section: Action Buttons */}
              <div className="flex space-x-3">
                <Link to={`/company/applications/profile/${app.applicant.id}`}>
                  <button className="btn btn-outline btn-info btn-sm flex items-center">
                    <FaUser className="mr-1" /> ดูประวัติส่วนตัว
                  </button>
                </Link>

                {app.status.name === 'รอการพิจารณา' && (
                  <>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleStatusChange(app.id, 2)} // Status: ผ่านการคัดเลือก
                      >
                      ผ่านการคัดเลือก
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleStatusChange(app.id, 3)} // Status: ถูกปฏิเสธ
                      >
                      ไม่ผ่านการคัดเลือก
                    </button>
                  </>
                )}

                {app.status.name === 'ผ่านการคัดเลือก' && (
                  <>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleStatusChange(app.id, 4)} // Status: รับเข้าการฝึกงาน
                      >
                      รับเข้าฝึกงาน
                    </button>
                      <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleStatusChange(app.id, 3)} // Status: ถูกปฏิเสธ
                      >
                      ปฏิเสธ
                    </button>
                  </>
                )}

                {app.status.name === 'กำลังฝึกงาน' && (
                  <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleStatusChange(app.id, 5)} // Status: ฝึกงานเสร็จสิ้น
                  >
                    ฝึกงานเสร็จสิ้น
                  </button>
                )}

                {(app.status.name === 'ถูกปฏิเสธ' || app.status.name === 'ฝึกงานเสร็จสิ้น') && (
                  <button className="btn btn-error btn-sm" onClick={() => handleDelete(app.id)}>
                    <FaTrash className="mr-1" /> ลบใบสมัคร
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationManagement;
