import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Navbar from '../../components/Navbar';

const CompanyInfo = () => {
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    company_category: null,
    phone_number: '',
    email: '',
    description: '',
    logo: null,
    background_image: null,
    logoPreview: 'https://via.placeholder.com/100',
    backgroundPreview: 'https://via.placeholder.com/1200x400',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category options
        const responseCategory = await axios.get('http://localhost:8000/company/company_category/');
        const options = responseCategory.data.map((category) => ({
          value: category.id,
          label: category.category_name,
        }));
        setCategoryOptions(options);

        // Fetch company data
        const responseCompany = await axios.get('http://localhost:8000/company/profile/');
        setCompanyData({
          ...responseCompany.data,
          company_category: {
            value: responseCompany.data.category.id,
            label: responseCompany.data.category.category_name,
          },
          logoPreview: responseCompany.data.logo ? `http://localhost:8000${responseCompany.data.logo}` : 'https://via.placeholder.com/100',
          backgroundPreview: responseCompany.data.background_image ? `http://localhost:8000${responseCompany.data.background_image}` : 'https://via.placeholder.com/1200x400',
        });
        setIsEditMode(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsEditMode(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (content) => {
    setCompanyData({ ...companyData, description: content });
  };

  const handleCategoryChange = (selectedOption) => {
    setCompanyData({ ...companyData, company_category: selectedOption });
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      if (type === 'logo') {
        setCompanyData({ ...companyData, logo: file, logoPreview: previewURL });
      } else if (type === 'background') {
        setCompanyData({ ...companyData, background_image: file, backgroundPreview: previewURL });
      }
    }
  };

  const handleRemoveImage = (type) => {
    if (type === 'logo') {
      setCompanyData({ ...companyData, logo: null, logoPreview: 'https://via.placeholder.com/100' });
    } else if (type === 'background') {
      setCompanyData({ ...companyData, background_image: null, backgroundPreview: 'https://via.placeholder.com/1200x400' });
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('name', companyData.name);
    formData.append('address', companyData.address);
    formData.append('phone_number', companyData.phone_number);
    formData.append('email', companyData.email);
    formData.append('description', companyData.description);
    formData.append('company_category', companyData.company_category.value);
    if (companyData.logo instanceof File) {
      formData.append('logo', companyData.logo);
    }
    if (companyData.background_image instanceof File) {
      formData.append('background_image', companyData.background_image);
    }
    
    try {
      let response;
      if (isEditMode) {
        response = await axios.put('http://localhost:8000/company/profile/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await axios.post('http://localhost:8000/company/profile/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(isEditMode ? 'บันทึกโปรไฟล์สำเร็จ!' : 'สร้างโปรไฟล์สำเร็จ!', { duration: 1000 });
        setTimeout(() => navigate('/company/profile'), 1000);
      }
    } catch (error) {
      console.error('Error saving company data:', error.response.data);
      toast.error('เกิดข้อผิดพลาดในการบันทึกโปรไฟล์');
    }
  };

  return (
    <div className="mx-auto bg-base-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 p-32">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">{isEditMode ? 'แก้ไขโปรไฟล์บริษัท' : 'สร้างโปรไฟล์บริษัท'}</h2>

          {/* Logo Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">โลโก้บริษัท</label>
            <div className="flex items-center space-x-4">
              <img src={companyData.logoPreview} alt="Logo" className="w-24 h-24 rounded-full object-cover" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageChange(e, 'logo')} 
                className="hidden" 
                id="logo-upload" 
              />
              <button className="btn btn-warning" onClick={() => document.getElementById('logo-upload').click()}>Change</button>
              <button className="btn btn-error" onClick={() => handleRemoveImage('logo')}>Remove</button>
            </div>
          </div>

          {/* Background Image Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">รูปพื้นหลัง</label>
            <div className="flex items-center space-x-4">
              <img src={companyData.backgroundPreview} alt="Background" className="w-full h-32 object-cover rounded-md" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageChange(e, 'background')} 
                className="hidden" 
                id="background-upload" 
              />
              <button className="btn btn-warning" onClick={() => document.getElementById('background-upload').click()}>Change</button>
              <button className="btn btn-error" onClick={() => handleRemoveImage('background')}>Remove</button>
            </div>
          </div>

          {/* Company Information Section */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">ชื่อบริษัท</label>
              <input
                type="text"
                name="name"
                value={companyData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ประเภทธุรกิจ</label>
              <Select
                options={categoryOptions}
                value={companyData.company_category}
                onChange={handleCategoryChange}
                className="w-full"
                placeholder="ค้นหาประเภทธุรกิจ"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">ที่อยู่บริษัท</label>
              <input
                type="text"
                name="address"
                value={companyData.address}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">เบอร์โทรศัพท์ติดต่อ</label>
              <input
                type="text"
                name="phone_number"
                value={companyData.phone_number}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">อีเมลบริษัท</label>
              <input
                type="email"
                name="email"
                value={companyData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">เกี่ยวกับบริษัท</label>
              <Editor
                apiKey="boo8d9alfaew4evkz831yoxwo57du15uk5j9v0vre1gi1hx1"
                value={companyData.description}
                onEditorChange={handleDescriptionChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <Link to="/company/profile">
              <button className="btn btn-error">ยกเลิก</button>
            </Link>
            <button className="btn btn-primary" onClick={handleSave}>บันทึกและโพสต์</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
