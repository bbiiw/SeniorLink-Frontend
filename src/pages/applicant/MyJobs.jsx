import React, { useEffect, useState } from "react"; 
import axios from "axios";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const MyJobs = () => {
  const [applications, setApplications] = useState([]);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/applicant/applications/`);
        setApplications(response.data);
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการดึงข้อมูลงานที่สมัคร");
      }
    };

    fetchApplications();
  }, []);

  // Handle delete application
  const handleDelete = async (applicationId) => {
    try {
      await axios.delete(`http://localhost:8000/applicant/applications/${applicationId}/`);
      setApplications(applications.filter(app => app.id !== applicationId));
      toast.success("ลบใบสมัครงานสำเร็จ");
    } catch (error) {
      toast.error("เกิดข้อผิดพลาดในการลบใบสมัครงาน");
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto py-10 px-32">
        <h1 className="text-4xl font-bold text-primary mb-8">งานที่สมัคร</h1>
        <p className="text-lg mb-6">ค้นพบใบสมัคร {applications.length} รายการ</p>

        {/* List of Applications */}
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
              {/* Left Content: Company and Job Information */}
              <div className="flex items-center space-x-4">
                <img src={`http://localhost:8000${app.job.company.logo}`} alt={app.job.company.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-xl font-semibold">{app.job.company.name}</h3>
                  <p className="text-gray-500">{app.job.title}</p>
                  <span
                    className={`badge ${
                      app.status.name === "ถูกปฏิเสธ"
                        ? "badge-error"
                        : app.status.name === "ผ่านการคัดเลือก"
                        ? "badge-success"
                        : app.status.name === "กำลังฝึกงาน"
                        ? "badge-secondary"
                        : app.status.name === "ฝึกงานเสร็จสิ้น"
                        ? "badge-primary"
                        : "badge-warning"
                    } mt-2`}
                  >
                    {app.status.name}
                  </span>
                </div>
              </div>

              {/* Right Content: Actions */}
              <div className="flex space-x-3">
                  <button className="btn btn-outline btn-error" onClick={() => handleDelete(app.id)}>
                    <p className="flex gap-2"><FaTrash /> ลบใบสมัคร</p>
                  </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MyJobs;
