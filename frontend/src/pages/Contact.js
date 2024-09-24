// src/pages/Contact.js

import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to backend or email)
    alert('Thank you for contacting us!');
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block text-lg mb-2">Name</label>
            <input
              type="text"
              className="form-control w-full p-3 border rounded-lg shadow-sm bg-white text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-lg mb-2">Email</label>
            <input
              type="email"
              className="form-control w-full p-3 border rounded-lg shadow-sm bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-6">
            <label className="block text-lg mb-2">Message</label>
            <textarea
              className="form-control w-full p-3 border rounded-lg shadow-sm bg-white text-black"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary py-2 px-4 text-white rounded-lg shadow-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
