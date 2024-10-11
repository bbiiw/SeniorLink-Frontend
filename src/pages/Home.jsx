import React from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="bg-base-200 p-10 text-center">
        <div className="max-w-screen-lg mx-auto">
          <h1 className="text-5xl font-bold">16,780 Jobs For You</h1>
          <p className="mt-4 text-xl">Explore the latest opportunities and find the perfect job</p>
          <button className="btn btn-primary mt-6">Explore more</button>
        </div>
      </section>

      {/* Job Category Section */}
      <section className="p-10">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Explore more jobs</h2>

          <div className="grid grid-cols-4 gap-6">
            {/* Categories */}
            <div className="card bg-primary text-white p-6">
              <h3 className="text-2xl">Finance</h3>
              <p className="text-lg mt-2">127 jobs</p>
            </div>

            <div className="card bg-warning text-white p-6">
              <h3 className="text-2xl">Education</h3>
              <p className="text-lg mt-2">527 jobs</p>
            </div>

            <div className="card bg-info text-white p-6">
              <h3 className="text-2xl">IT</h3>
              <p className="text-lg mt-2">3524 jobs</p>
            </div>

            <div className="card bg-success text-white p-6">
              <h3 className="text-2xl">Marketing</h3>
              <p className="text-lg mt-2">237 jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Section */}
      <section className="bg-base-200 p-10">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Latest jobs</h2>

          <div className="grid grid-cols-3 gap-6">
            {/* Job Cards */}
            <div className="card shadow-lg p-6">
              <h3 className="text-xl font-bold">UI/UX Designer</h3>
              <p className="text-sm">Full-time - San Francisco, CA</p>
              <p className="text-sm">Posted on: 12 March 2023</p>
            </div>

            <div className="card shadow-lg p-6">
              <h3 className="text-xl font-bold">ReactJS Developer</h3>
              <p className="text-sm">Remote - New York, NY</p>
              <p className="text-sm">Posted on: 10 March 2023</p>
            </div>

            <div className="card shadow-lg p-6">
              <h3 className="text-xl font-bold">Product Manager</h3>
              <p className="text-sm">Full-time - Los Angeles, CA</p>
              <p className="text-sm">Posted on: 9 March 2023</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base-300 p-10 text-center">
        <div className="max-w-screen-lg mx-auto">
          <p>&copy; 2024 Job Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
