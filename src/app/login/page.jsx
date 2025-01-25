'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie library
import axios from 'axios';
import * as Yup from 'yup'; // Import Yup for validation


function Page() {
  const [userForm, setuserForm] = useState({
    email: 'israr@gmail.com',
    password: '',
  });

  const [errors, setErrors] = useState({}); // State for validation errors
  const [loading, setloading] = useState(false);

  // Yup schema for validation
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the form state
    setuserForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the field being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      // Validate form data using Yup
      await validationSchema.validate(userForm, { abortEarly: false });

      // If validation passes, make the API call
      setloading(true);
      const response = await axios.post('/api/login', userForm); // Replace with your API URL

      // Save token to cookies
      Cookies.set('auth_token', response.data.token, { expires: 7 }); // Expires in 7 days
      //console.log('Response:', response.data);
      setloading(false);
      alert('User Login successfully!');
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Extract validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors); // Update the state with errors
      } else {
        console.error('Error posting data:', error);
        alert('Failed to post data.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h1 className="text-xl font-bold text-center mb-4">User Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">


        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userForm.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`mt-1 block w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={userForm.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`mt-1 block w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
            }`}
          disabled={loading} // Disable button when loading is true
        >
          {loading ? "Loading..." : "Login"}
        </button>



      </form>
    </div>
  );
}

export default Page;
