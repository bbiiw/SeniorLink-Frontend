import React from 'react';
import { FaMapMarkerAlt, FaClock, FaCalendarAlt } from 'react-icons/fa';

const JobCard = ({ job, onClick }) => {
  return (
    <div className="flex justify-between items-start bg-white p-6 rounded-lg shadow-md mb-4 cursor-pointer hover:bg-slate-50" onClick={onClick}>
      {/* Left Content: Job Information */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <p className="text-gray-600">{job.company.name}</p>

        {/* Duration */}
        <div className="flex items-center text-gray-600">
          <FaClock className="mr-2" />
          <span>ระยะเวลาฝึกงาน {job.duration}</span>
        </div>

        {/* Start and End Date */}
        <div className="flex items-center text-gray-600">
          <FaCalendarAlt className="mr-2" />
          <span>{job.start_date} - {job.end_date}</span>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-4 mt-2 text-gray-600">
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 h-4 w-4 flex-shrink-0" />
            <span>{job.location}</span>
          </div>
        </div>

        {/* Posted Date (created_at) */}
        <div className="flex items-center text-gray-600 mt-2">
          <FaCalendarAlt className="mr-2" />
          <span>โพสต์เมื่อ: {job.created_at}</span>
        </div>
      </div>

      {/* Right Content: Company Logo */}
      <div className="flex-shrink-0">
        <img src={`http://localhost:8000${job.company.logo}`} alt={`${job.company.name} Logo`} className="w-16 h-16 rounded-lg" />
      </div>
    </div>
  );
};

export default JobCard;
