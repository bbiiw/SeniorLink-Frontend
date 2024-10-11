import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Select from "react-select"; // dropdown ที่รองรับการค้นหา

const Skills = ({ profileData, setProfileData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skillOptions, setSkillOptions] = useState([]);

  // ดึงข้อมูล skills จาก API เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:8000/skills/');
        const mapSkills = response.data.map(skill => ({ value: skill.id, label: skill.name }));
        setSkillOptions(mapSkills);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  // select skill
  const handleSkillChange = (selectedOption, index) => {
    const updatedSkills = [...profileData.skills];
    updatedSkills[index] = { value: selectedOption.value, label: selectedOption.label };
    setProfileData({ ...profileData, skills: updatedSkills });
  };  

  const addSkill = () => {
    setProfileData({ ...profileData, skills: [...profileData.skills, { value: "", label: "" }] });
  };

  const removeSkill = (index) => {
    const updatedSkills = profileData.skills.filter((_, i) => i !== index);
    setProfileData({ ...profileData, skills: updatedSkills });
  };

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">ทักษะ</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost btn-circle">
          {isOpen ? <IoIosArrowUp className="h-6 w-6" /> : <IoIosArrowDown className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div>
          {profileData.skills.map((skill, index) => (
            <div key={index} className="flex items-center mb-4 space-x-4">
              <h3 className="text-md font-semibold flex-none w-1/4">{index + 1}. {skill.label || ""}</h3>

              {/* Dropdown และปุ่มลบ */}
              <div className="flex items-center w-3/4 space-x-4">
                <FaEdit />
                <Select
                  options={skillOptions}
                  value={skillOptions.find(option => option.value === skill.value)}
                  onChange={(selectedOption) => handleSkillChange(selectedOption, index)}
                  placeholder="ค้นหาทักษะ"
                  className="w-full"
                />
                <button className="btn btn-outline btn-error" onClick={() => removeSkill(index)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <button className="btn btn-primary" onClick={addSkill}>+ เพิ่มทักษะ</button>
        </div>
      )}
    </div>
  );
};

export default Skills;
