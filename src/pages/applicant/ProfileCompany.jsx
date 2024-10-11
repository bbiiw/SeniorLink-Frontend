import React, { useState, useEffect } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaMapMarkerAlt, FaPhoneAlt, FaArrowLeft } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const ProfileCompany = () => {
  const { companyId } = useParams();  // Get company_id from URL
  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/applicant/applications/profile/${companyId}`);
        setProfile(response.data);
        setHasProfile(true);
      } catch (error) {
        setHasProfile(false);
      }
    };

    // Fetch job positions for the company
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/company_positions/${companyId}/`);
        console.log(response.data)
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job positions", error);
      }
    };

    fetchProfile();
    fetchJobs();
  }, [companyId]);

  return (
    <div className="mx-auto bg-base-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-6 lg:px-32">
        <Link to="/jobs" className="btn btn-primary mb-4">
            <FaArrowLeft className="mr-2" /> ย้อนกลับ
        </Link>

        {!hasProfile ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">ไม่พบโปรไฟล์บริษัท</h2>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="relative bg-white rounded-lg shadow-lg">
              <div className="h-64 w-full bg-cover bg-center rounded-t-lg overflow-hidden">
                <img 
                  src={profile.background_image ? `http://localhost:8000${profile.background_image}` : `https://via.placeholder.com/1200x400`} 
                  alt="background" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Company Logo */}
              <div className="absolute top-40 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <img 
                  src={profile.logo ? `http://localhost:8000${profile.logo}` : 'https://via.placeholder.com/100'} 
                  alt="Company Logo" 
                  className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg" 
                />
              </div>
              {/* Company Information */}
              <div className="pt-16 pb-8 text-center">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-gray-600">{profile.category.category_name}</p>
                
                <div className="flex justify-center space-x-6 mt-4 text-gray-600">
                  {/* Email */}
                  <div className="flex items-center space-x-2">
                    <IoIosMail className="w-6 h-6" />
                    <span>{profile.email}</span>
                  </div>

                  {/* Address */}
                  <div className="flex items-center space-x-2 max-w-lg">
                    <FaMapMarkerAlt className="w-6 h-6" />
                    <span>{profile.address}</span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center space-x-2">
                    <FaPhoneAlt />
                    <span>{profile.phone_number}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Us Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">เกี่ยวกับบริษัท</h2>
              <div className="text-md mt-2" dangerouslySetInnerHTML={{ __html: profile.description }} />
            </div>

            {/* Recent Job Openings Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">ตำแหน่งที่เปิดรับสมัคร</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.length > 0 ? (
                  jobs.map((job, index) => (
                    <div key={index} className="border-2 p-4 rounded-lg shadow-lg flex items-center space-x-4">
                      {/* Job Logo */}
                      <div className="w-16 h-16 flex-shrink-0">
                        <img src={job.company.logo ? `http://localhost:8000${job.company.logo}` : `https://via.placeholder.com/50`} alt="Job Logo" className="w-full h-full object-cover rounded-md" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.duration} | {job.start_date} - {job.end_date}</p>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FaMapMarkerAlt className="text-gray-500" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-600">ยังไม่มีการเปิดรับสมัคร</p>
                )}
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCompany;
