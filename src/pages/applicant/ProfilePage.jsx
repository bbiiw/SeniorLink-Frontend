import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import Navbar from "../../components/Navbar";

const ProfilePage = () => {
  const [hasProfile, setHasProfile] = useState(false); // มีโปรไฟล์แล้วหรือไม่
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // ดึงข้อมูลโปรไฟล์จากเซิร์ฟเวอร์
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/applicant/profile/');

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
      <div className="container mx-auto py-10 p-32">
        {!hasProfile ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">คุณยังไม่มีโปรไฟล์</h2>
            <Link to="/applicant/edit">
              <button className="btn btn-primary">สร้างประวัติของคุณ</button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="col-span-1 space-y-6">
              {/* Profile Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col items-center">
                <img
                  src={profile.profile_picture ? `http://localhost:8000${profile.profile_picture}` : "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full mb-4 object-cover"
                />
                  <h2 className="text-xl font-semibold">{profile.first_name} {profile.last_name}</h2>
                  <Link to="/applicant/edit">
                    <button className="btn btn-primary mt-4"><FaEdit /> แก้ไขโปรไฟล์</button>
                  </Link>
                </div>
              </div>

              {/* BirthDate Address Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">วันเกิด</h3>
                <p>{profile.birth_date}</p>
                <h3 className="text-lg font-semibold mt-4">ที่อยู่</h3>
                <p>{profile.address}</p>
              </div>

              {/* Contact Me Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">ช่องทางติดต่อ</h3>
                <p className="flex items-center mb-2">
                  <FaPhone className="mr-2" /> {profile.phone_number}
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="mr-2" /> {profile.email}
                </p>
              </div>
            </div>

            {/* Right Content */}
            <div className="col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">เกี่ยวกับฉัน</h3>
                </div>
                <div 
                  className="text-md mt-2" 
                  dangerouslySetInnerHTML={{ __html: profile.description } || 'ยังไม่มีข้อมูล'} 
                />
              </div>

              {/* Education Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">การศึกษา</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-4">
                    <span className="text-pink-600">🎓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{profile.education.name}</h4>
                    <p><b>คณะ</b> {profile.education.faculty} <b>สาขา</b> {profile.education.major}</p>
                    <p>{profile.education.start_year} - {profile.education.end_year !== 0 ? profile.education.end_year : "ปัจจุบัน"}</p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">ทักษะ</h3>
                <ul className="list-disc list-inside">
                  {profile.myskills.map(skill => {
                    return <li key={skill.id}>{skill.name}</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
