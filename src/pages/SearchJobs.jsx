import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from 'react-select';
import toast from 'react-hot-toast';
import { FaSearch } from "react-icons/fa";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import JobDetail from "../components/JobDetail";

const SearchJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [jobCategories, setJobCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const leftPanelRef = useRef(null);  // Ref for left job list panel
  const rightPanelRef = useRef(null); // Ref for right job details panel

  // Fetch job positions
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/positions/');
        setJobs(response.data);
        if (response.data.length > 0) {
          setSelectedJob(response.data[0]);
        }
      } catch (error) {
        toast.error('เกิดข้อผิดพลาดในการดึงข้อมูลตำแหน่งงาน');
      }
    };

    fetchJobs();
  }, []);

  // Fetch job categories
  useEffect(() => {
    const fetchJobCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/job_category/');
        const options = response.data.map(category => ({
          value: category.id,
          label: `${category.category_name} (${category.job_count})`,
        }));
        setJobCategories(options);
      } catch (error) {
        toast.error('เกิดข้อผิดพลาดในการดึงข้อมูลประเภทงาน');
      }
    };

    fetchJobCategories();
  }, []);

  // Handle search filter
  const handleSearch = async () => {
    try {
      const params = {
        search: searchQuery,
        job_category: selectedCategory ? selectedCategory.value : null,
      };

      const response = await axios.get('http://localhost:8000/positions/', { params });

      const filteredJobs = response.data.filter(job => {
        const matchesCategory = selectedCategory ? job.job_category === selectedCategory.value : true;
        const matchesSearchQuery = searchQuery ? job.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
        return matchesCategory && matchesSearchQuery;
      });

      setJobs(filteredJobs);

      if (filteredJobs.length > 0) {
        setSelectedJob(filteredJobs[0]);
      } else {
        setSelectedJob(null);
      }
    } catch (error) {
      toast.error('เกิดข้อผิดพลาดในการค้นหาตำแหน่งงาน');
    }
  };

  // Handle mouse enter and leave for scrolling
  const handleMouseEnterLeft = () => {
    if (leftPanelRef.current) {
      leftPanelRef.current.style.overflowY = 'auto';
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.style.overflowY = 'hidden';
    }
  };

  const handleMouseEnterRight = () => {
    if (rightPanelRef.current) {
      rightPanelRef.current.style.overflowY = 'auto';
    }
    if (leftPanelRef.current) {
      leftPanelRef.current.style.overflowY = 'hidden';
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <div className="container mx-auto py-10 px-32">
        <h1 className="text-primary text-4xl font-bold mb-8">ค้นหา<span className="text-info">งาน</span></h1>

        {/* Search Bar and Filters */}
        <div className="flex items-center mb-8 space-x-4">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="ค้นหาตำแหน่งฝึกงาน"
              className="input input-bordered w-96 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="ml-2 absolute left-2 top-1/2 transform -translate-y-1/2" onClick={handleSearch}>
              <FaSearch className="text-gray-500" />
            </button>
          </div>

          {/* Job Category Filter */}
          <div className="w-1/4">
            <Select
              options={jobCategories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="ค้นหาประเภทงาน"
              isClearable
            />
          </div>

          <button className="btn btn-primary" onClick={handleSearch}>ค้นหา</button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Sidebar - Job List */}
          <div
            className="col-span-1 space-y-6 h-screen overflow-hidden no-scrollbar" 
            onMouseEnter={handleMouseEnterLeft} 
            ref={leftPanelRef}
          >
            {jobs.length > 0 ? (
              <>
                {jobs.slice(0, showAll ? jobs.length : 3).map((job, index) => (
                  <JobCard key={index} job={job} onClick={() => setSelectedJob(job)} />
                ))}
                {jobs.length > 3 && (
                  <button
                    className="btn btn-secondary w-full"
                    onClick={() => setShowAll(!showAll)}
                  >
                    {showAll ? 'แสดงน้อยลง' : 'แสดงเพิ่มเติม'}
                  </button>
                )}
              </>
            ) : (
              <p className="text-center text-xl text-gray-500">ไม่พบผลการค้นหา</p>
            )}
          </div>

          {/* Right - Job Detail */}
          <div
            className="col-span-2 h-screen overflow-hidden no-scrollbar" 
            onMouseEnter={handleMouseEnterRight} 
            ref={rightPanelRef}
          >
            {selectedJob ? (
              <JobDetail job={selectedJob} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
