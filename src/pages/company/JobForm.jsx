import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Navbar from '../../components/Navbar';

const JobForm = () => {
  const { id } = useParams();  // Get the job ID form URL (editing)
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    location: '',
    duration: null,
    start_date: '',
    end_date: '',
    job_category: null,
    skills: [],
    newSkill: null,
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [skillsOptions, setSkillsOptions] = useState([]);
  const [durationOptions, setDurationOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        // Fetch job categories
        const responseCategories = await axios.get('http://localhost:8000/job_category/');
        const categorySets = responseCategories.data.map(category => ({
          value: category.id,
          label: category.category_name,
        }));
        setCategoryOptions(categorySets);

        // Fetch skills
        const responseSkills = await axios.get('http://localhost:8000/skills/');
        const skillSets = responseSkills.data.map(skill => ({
          value: skill.id,
          label: skill.name,
        }));
        setSkillsOptions(skillSets);

        // Fetch job data (editing)
        if (id) {
          const response = await axios.get(`http://localhost:8000/positions/${id}/`);
          const job = response.data;
          const start_date = convertDate(job.start_date);
          const end_date = convertDate(job.end_date);

          setJobData({
            ...job,
            duration: { value: job.duration, label: job.duration },
            start_date: start_date,
            end_date: end_date,
            job_category: { value: job.job_category, label: job.category.category_name },
            skills: job.myskills.map(skill => ({ value: skill.id, label: skill.name })),
          });
        }
        
        // Set duration options
        const durations = Array.from({ length: 12 }, (_, i) => ({
          value: `${i + 1} เดือน`,
          label: `${i + 1} เดือน`,
        }));
        setDurationOptions(durations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchOptions();
  }, [id]);

  const convertDate = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleDescriptionChange = (content) => {
    setJobData({ ...jobData, description: content });
  };

  const handleCategoryChange = (selectedOption) => {
    setJobData({ ...jobData, job_category: selectedOption });
  };

  const handleDurationChange = (selectedOption) => {
    setJobData({ ...jobData, duration: selectedOption });
  };

  const handleSkillChange = (selectedOption) => {
    setJobData({ ...jobData, newSkill: selectedOption });
  };

  const addSkill = () => {
    if (jobData.newSkill && !jobData.skills.some(skill => skill.value === jobData.newSkill.value)) {
      setJobData({
        ...jobData,
        skills: [...jobData.skills, jobData.newSkill],
        newSkill: null,
      });
    }
  };

  const removeSkill = (skillToRemove) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter(skill => skill.value !== skillToRemove.value),
    });
  };

  const handleSave = async () => {
    try {
      const data = {
        title: jobData.title,
        location: jobData.location,
        job_category: jobData.job_category ? jobData.job_category.value : null,
        duration: jobData.duration ? jobData.duration.label : null,
        start_date: jobData.start_date,
        end_date: jobData.end_date,
        description: jobData.description,
        skills: jobData.skills.map(skill => skill.value),
      };

      let response;
      if (id) {
        response = await axios.put(`http://localhost:8000/positions/${id}/`, data); //แก้ไขงาน
      } else {
        response = await axios.post('http://localhost:8000/company_positions/', data); //สร้างงาน
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(id ? 'บันทึกตำแหน่งงานสำเร็จ!' : 'สร้างตำแหน่งงานสำเร็จ!', { duration: 1000 });
        setTimeout(() => {
          navigate('/company/job-list');
        }, 1000);
      }
    } catch (error) {
      console.error('Error saving job position:', error.response.data);
      toast.error('เกิดข้อผิดพลาดในการบันทึกตำแหน่งงาน');
    }
  };

  return (
    <div className="mx-auto bg-base-200 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-10 p-32">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          {/* Header */}
          <h1 className="text-2xl font-bold mb-6">{id ? 'แก้ไขตำแหน่งฝึกงาน' : 'ประกาศตำแหน่งฝึกงานใหม่'}</h1>

          {/* Job Information Section */}
          <div className="space-y-6">
            {/* Job Information Form */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {/* Job Title */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อตำแหน่งงาน</label>
                <input 
                  type="text" 
                  name="title"
                  className="input input-bordered w-full rounded-lg"
                  value={jobData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Job Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">สถานที่ฝึกงาน</label>
                <input 
                  type="text" 
                  name="location"
                  className="input input-bordered w-full rounded-lg"
                  value={jobData.location}
                  onChange={handleInputChange}
                />
              </div>

              {/* Job Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ประเภทงาน</label>
                <Select
                  options={categoryOptions}
                  value={jobData.job_category}
                  onChange={handleCategoryChange}
                  className="w-full"
                  placeholder="ค้นหาประเภทงาน"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">วันที่เริ่มฝึกงาน</label>
                <input 
                  type="date"
                  name="start_date"
                  className="input input-bordered w-full rounded-lg"
                  value={jobData.start_date}
                  onChange={handleInputChange}
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">วันที่จบฝึกงาน</label>
                <input 
                  type="date"
                  name="end_date"
                  className="input input-bordered w-full rounded-lg"
                  value={jobData.end_date}
                  onChange={handleInputChange}
                />
              </div>

              {/* Duration */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">ระยะเวลาฝึกงาน</label>
                <Select
                  options={durationOptions}
                  value={jobData.duration}
                  onChange={handleDurationChange}
                  className="w-full"
                  placeholder="เลือกระยะเวลาฝึกงาน"
                />
              </div>

              {/* Job Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">รายละเอียดงาน</label>
                <Editor
                  apiKey="boo8d9alfaew4evkz831yoxwo57du15uk5j9v0vre1gi1hx1"
                  value={jobData.description}
                  onEditorChange={handleDescriptionChange}
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold">ทักษะที่ต้องการ</h2>
              <div className="flex flex-wrap gap-2">
                {jobData.skills.map((skill, index) => (
                  <span key={index} className="badge badge-primary rounded-lg flex items-center">
                    {skill.label} <button onClick={() => removeSkill(skill)} className="ml-1 font-medium">X</button>
                  </span>
                ))}
              </div>
              <div className="flex items-center mt-4 w-2/3">
                <Select
                  options={skillsOptions}
                  value={jobData.newSkill}
                  onChange={handleSkillChange}
                  className="w-full"
                  placeholder="ค้นหาทักษะที่ต้องการ"
                />
                <button className="btn btn-primary ml-5 rounded-lg" onClick={addSkill}>+ เพิ่มทักษะ</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <Link to="/company/job-list"><button className="btn btn-error rounded-lg">ยกเลิก</button></Link>
              <button className="btn btn-primary rounded-lg" onClick={handleSave}>บันทึกและโพสต์</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
