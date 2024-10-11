import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch job positions
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/company_positions/');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error('เกิดข้อผิดพลาดในการดึงข้อมูลตำแหน่งงาน');
      }
    };

    fetchJobs();
  }, []);

  // Handle deleting a job
  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:8000/positions/${jobId}/`);
      setJobs(jobs.filter((job) => job.id !== jobId));
      toast.success('ลบตำแหน่งงานสำเร็จ');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('เกิดข้อผิดพลาดในการลบตำแหน่งงาน');
    }
  };

  return (
    <div className="mx-auto bg-base-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 p-32">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">รายการประกาศงาน</h1>
          {/* Add Job Button */}
          <Link to="/company/job-form" className="btn btn-primary">+ ประกาศตำแหน่งฝึกงานใหม่</Link>
        </div>

        {/* Job List */}
        <div className="space-y-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow-lg flex space-x-6 items-start">
                {/* Job Information */}
                <div className="flex-1">
                  {/* Job Title and Skills */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    {/* Skills Section */}
                    <div className="flex space-x-2 flex-wrap">
                      {job.myskills.map((skill) => (
                        <span key={skill.id} className="badge badge-primary rounded-lg">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Company Name */}
                  <p className="text-gray-600 mt-2">{job.company_name}</p>

                  {/* Location and Duration */}
                  <div className="flex items-center justify-between space-x-2 mt-2">
                    <div className="flex items-center space-x-1 text-gray-700 max-w-xl">
                      <FaMapMarkerAlt className="text-gray-500" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-700">
                      <FaBriefcase className="text-gray-500" />
                      <span>{job.duration} ตั้งแต่วันที่: {job.start_date} - {job.end_date}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3 items-center">
                  <Link to={`/company/job-form/${job.id}`} className="btn btn-outline btn-warning btn-sm">
                    <FaEdit />
                  </Link>
                  <button className="btn btn-outline btn-error btn-sm" onClick={() => handleDelete(job.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-xl">ยังไม่มีการประกาศตำแหน่งงาน</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobList;
