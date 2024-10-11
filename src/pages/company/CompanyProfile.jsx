import React, { useState, useEffect } from 'react';
import { IoIosMail } from "react-icons/io";
import { FaMapMarkerAlt, FaPhoneAlt, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const CompanyProfile = () => {
  const [hasProfile, setHasProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/company/profile/');
        console.log(response.data);
        setProfile(response.data);
        setHasProfile(true);
      } catch (error) {
        setHasProfile(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="mx-auto bg-base-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 px-6 lg:px-32">
        {!hasProfile ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">คุณยังไม่มีโปรไฟล์บริษัท</h2>
            <Link to="/company/edit">
              <button className="btn btn-primary">สร้างโปรไฟล์บริษัท</button>
            </Link>
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

                {/* Edit Profile Button */}
                <div className="mt-4">
                  <Link to="/company/edit">
                    <button className="btn btn-outline btn-primary">
                      <FaEdit /> แก้ไขโปรไฟล์
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* About Us Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-bold mb-4">เกี่ยวกับบริษัท</h2>
                <div 
                  className="text-md mt-2" 
                  dangerouslySetInnerHTML={{ __html: profile.description } || 'ยังไม่มีข้อมูล'} 
                />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
