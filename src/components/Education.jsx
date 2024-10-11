import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Education = ({ profileData, setProfileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stillStudying, setStillStudying] = useState(profileData.education.end_year === null); // ตรวจสอบว่าเรียนอยู่หรือไม่

  const years = Array.from(new Array(10), (val, index) => 2020 + index);

  useEffect(() => {
    setStillStudying(profileData.education.end_year === null);
  }, [profileData.education.end_year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      education: {
        ...profileData.education,
        [name]: value,
      },
    });
  };

  const handleStudying = (e) => {
    const isChecked = e.target.checked;
    setStillStudying(isChecked);
    setProfileData({
      ...profileData,
      education: {
        ...profileData.education,
        end_year: isChecked ? null : profileData.education.end_year || '',
      },
    });
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">การศึกษา</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle">
          {isOpen ? <IoIosArrowUp className="h-6 w-6" /> : <IoIosArrowDown className="h-6 w-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">มหาวิทยาลัย</label>
            <input 
              type="text" 
              className="input input-bordered w-full" 
              name="name"
              value={profileData.education.name || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">คณะ</label>
            <input 
              type="text" 
              className="input input-bordered w-full" 
              name="faculty"
              value={profileData.education.faculty || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">สาขาวิชา</label>
            <input 
              type="text" 
              className="input input-bordered w-full" 
              name="major"
              value={profileData.education.major || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ปีที่เริ่มเรียน</label>
            <select 
              className="select select-bordered w-full" 
              name="start_year"
              value={profileData.education.start_year || ''}
              onChange={handleChange}
            >
              <option value="" disabled>เลือกปีที่เริ่มเรียน</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ปีที่จบ</label>

            <select 
              className="select select-bordered w-full" 
              name="end_year"
              value={profileData.education.end_year || ''}
              onChange={handleChange}
              disabled={stillStudying}
            >
              <option value="" disabled>เลือกปีที่จบ</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <div className="mt-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="checkbox checkbox-primary mr-2" 
                  checked={stillStudying}
                  onChange={handleStudying}
                />
                ยังไม่จบการศึกษา
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
