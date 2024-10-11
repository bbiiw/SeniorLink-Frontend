import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [role, setRole] = useState("guest"); // guest, applicant, company
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // ดึงข้อมูล role และ username จาก Local Storage เมื่อ Navbar โหลดขึ้น
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const storedUsername = localStorage.getItem('username');
    if (storedRole) {
      setRole(storedRole);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const Logout = async () => {
    try {
      await axios.post('http://localhost:8000/authen/logout/');

      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      
      // รีเซ็ต axios headers
      delete axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['X-CSRFToken'];
      
      toast.success('ออกจากระบบสำเร็จ!');
      setRole('guest');
      setUsername('');
      navigate('/');
    } catch (error) {
      console.log(error.response.data);
      toast.error('เกิดข้อผิดพลาดในการออกจากระบบ');
    };
  };

  return (
    <div className="navbar bg-primary text-white px-4">
      <Toaster />
      {/* Logo */}
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl text-white" to="/">
          <img src="/logo.png" alt="LOGO" className="ml-5 h-12" />
          <h1 className="text-2xl">InternLink</h1>
        </Link>
      </div>

      {/* Navbar Links */}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">

          {role === "applicant" && (
            <>
              <li>
                <Link className="text-white hover:text-secondary" to="/jobs">หางาน</Link>
              </li>
              <li>
                <Link className="text-white hover:text-secondary" to="/applicant/profile">ประวัติของฉัน</Link>
              </li>
              <li>
                <Link className="text-white hover:text-secondary" to="/applicant/my-jobs">งานของฉัน</Link>
              </li>
            </>
          )}

          {role === "company" && (
            <>
              <li>
                <Link className="text-white hover:text-secondary" to="/company/profile">ข้อมูลบริษัท</Link>
              </li>
              <li>
                <Link className="text-white hover:text-secondary" to="/company/job-list">ตำแหน่งงาน</Link>
              </li>
              <li>
                <Link className="text-white hover:text-secondary" to="/company/applications">ใบสมัคร</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Login/Notifications and User Profile */}
      <div className="flex-none">
        {role === "guest" ? (
          <div className="flex space-x-2">
            {/* Register Dropdown */}
            <div className="dropdown dropdown-hover">
              <button className="btn btn-secondary">ลงทะเบียน</button>
              <ul className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52 right-0">
                <li>
                  <Link to="/register/applicant" className="hover:bg-info">ลงทะเบียนสำหรับผู้สมัครงาน</Link>
                </li>
                <li>
                  <Link to="/register/company" className="hover:bg-info">ลงทะเบียนสำหรับบริษัท</Link>
                </li>
              </ul>
            </div>

            {/* Login Dropdown */}
            <div className="dropdown dropdown-hover">
              <button className="btn btn-secondary">เข้าสู่ระบบ</button>
              <ul className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52 right-0">
                <li>
                  <Link to="/login/applicant" className="hover:bg-info">เข้าสู่ระบบสำหรับผู้สมัครงาน</Link>
                </li>
                <li>
                  <Link to="/login/company" className="hover:bg-info">เข้าสู่ระบบสำหรับบริษัท</Link>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-outline btn-secondary text-white">
                คุณคือ {username}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary rounded-box w-52"
              >
                <li>
                  <button onClick={Logout} className="hover:bg-error">ออกจากระบบ</button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
