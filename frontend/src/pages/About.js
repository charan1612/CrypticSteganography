// frontend/src/pages/About.js

import React from 'react';

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">About HideNSeek</h2>
            <p className="mb-4">
            HideNSeek is a web application that enables users to hide and retrieve information within images using steganography techniques. Whether you want to securely embed a secret message or conceal an image within another image, HideNSeek provides an easy and efficient solution.
            </p>
            <h3 className="text-xl font-semibold mb-2">Features</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Encode and decode text messages within images.</li>
              <li>Embed hidden images within carrier images.</li>
              <li>User-friendly interface with simple forms and image previews.</li>
              <li>Secure data handling ensuring your information remains private.</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Technologies Used</h3>
            <ul className="list-disc list-inside mb-4">
              <li>Frontend: React, Tailwind CSS, Axios</li>
              <li>Backend: Flask, Python, Pillow</li>
              <li>Deployment: Heroku, Vercel, or other platforms</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Purpose</h3>
            <p className="mb-4">
              In an age where data security and privacy are paramount, steganography provides an additional layer of protection by concealing information within seemingly innocuous files. HideNSeek aims to make steganography accessible to everyone, enabling users to protect their sensitive data effortlessly.
            </p>
            <h3 className="text-xl font-semibold mb-2">Contact and Support</h3>
            <p className="mb-4">
              If you have any questions, feedback, or need assistance, feel free to reach out through our <a href="/contact" className="text-blue-500 underline">Contact</a> page.
            </p>
          </div>
    </div>
    
  );
};

export default About;
