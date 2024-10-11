import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const GeneralInformation = ({ profileData, setProfileData }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [imagePreview, setImagePreview] = useState('');

  // Initialize image preview if profileData has a profile_picture URL
  useEffect(() => {
    if (typeof profileData.profile_picture === 'string' && profileData.profile_picture) {
      setImagePreview(`http://localhost:8000${profileData.profile_picture}`);
    }

    if (profileData.birth_date && profileData.birth_date.includes('/')) {
      const [day, month, year] = profileData.birth_date.split('/');
      setProfileData({ ...profileData, birth_date: `${year}-${month}-${day}` });
    }
  }, [profileData.profile_picture, profileData.birth_date]);

  // Text input handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "birth_date" && value) {
      const [year, month, day] = value.split('-');
      setProfileData({ ...profileData, [name]: `${day}/${month}/${year}` });
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  // Profile image input handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData({ ...profileData, profile_picture: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Remove image handler
  const removeImage = () => {
    setProfileData({ ...profileData, profile_picture: '' });
    setImagePreview('');
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">ข้อมูลส่วนตัว</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle">
          {isOpen ? <IoIosArrowUp className="h-6 w-6" /> : <IoIosArrowDown className="h-6 w-6" />}
        </button>
      </div>
      
      {isOpen && (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">รูปโปรไฟล์</label>
            {imagePreview ? (
              <div className="flex items-center space-x-4">
                <img src={imagePreview} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
                <button onClick={removeImage} className="btn btn-error">Remove</button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input file-input-bordered"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ชื่อจริง</label>
            <input 
              type="text" 
              className="input input-bordered w-full" 
              name="first_name"
              value={profileData.first_name || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">นามสกุล</label>
            <input 
              type="text" 
              className="input input-bordered w-full" 
              name="last_name"
              value={profileData.last_name || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เพศ</label>
            <select 
              className="select select-bordered w-full"
              name="gender"
              value={profileData.gender || ''}
              onChange={handleChange}
            >
              <option value="">เลือกเพศ</option>
              <option value="M">ชาย</option>
              <option value="F">หญิง</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">วันเกิด</label>
            <input 
              type="date" 
              className="input input-bordered w-full" 
              name="birth_date"
              value={profileData.birth_date || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์</label>
            <input 
              type="text" 
              className="input input-bordered w-full" 
              name="phone_number"
              value={profileData.phone_number || ''}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">อีเมลติดต่อ</label>
            <input 
              type="text" 
              className="input input-bordered w-full" 
              name="email"
              value={profileData.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">ที่อยู่</label>
            <textarea 
              className="textarea textarea-bordered w-full"
              name="address"
              value={profileData.address || ''}
              onChange={handleChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralInformation;
