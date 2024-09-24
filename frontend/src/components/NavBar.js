// // frontend/src/components/NavBar.js

// import React from 'react';
// import { Link } from 'react-router-dom';

// const NavBar = () => {
//   return (
//     <nav className="bg-blue-600 p-4">
//       <div className="container mx-auto flex justify-between">
//         <h1 className="text-white text-2xl font-bold">StegoApp</h1>
//         <div className="space-x-4">
//           <Link to="/" className="text-white hover:text-gray-200">Home</Link>
//           <Link to="/text" className="text-white hover:text-gray-200">Text Steganography</Link>
//           <Link to="/image" className="text-white hover:text-gray-200">Image Steganography</Link>
//           <Link to="/about" className="text-white hover:text-gray-200">About</Link>
//           <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;



import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <nav className="bg-blue-600 dark:bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">HideNSeek</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-200">Home</Link>
          <Link to="/text" className="text-white hover:text-gray-200">Text Steganography</Link>
          <Link to="/image" className="text-white hover:text-gray-200">Image Steganography</Link>
          <Link to="/about" className="text-white hover:text-gray-200">About</Link>
          <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
        </div>
        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="ml-4 p-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white rounded-full"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
