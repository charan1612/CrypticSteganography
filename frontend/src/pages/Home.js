// frontend/src/pages/Home.js

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="container mx-auto p-8 text-center ">
//       <h2 className="text-4xl font-bold mb-6">Welcome to StegoApp</h2>
//       <p className="text-xl mb-8">
//         StegoApp allows you to hide and retrieve hidden information within images using steganography techniques. Choose between text and image steganography to secure your data seamlessly.
//       </p>
//       <Link to="/text" className="btn btn-primary mr-4 py-2 px-4 text-white rounded-lg shadow-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300">
//         Text Steganography
//       </Link>
//       <Link to="/image" className="btn btn-primary py-2 px-4 text-white rounded-lg shadow-lg bg-green-500 hover:bg-green-600 transition-all duration-300">
//         Image Steganography
//       </Link>
//     </div>
//   );
// };

// export default Home;



import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-4xl font-bold mb-6">Welcome to HideNSeek</h2>
        <p className="text-xl mb-8">
        HideNSeekApp allows you to hide and retrieve hidden information within images using steganography techniques. Choose between text and image steganography to secure your data seamlessly.
        </p>
        <Link to="/text" className="btn btn-primary mr-4 py-2 px-4 text-white rounded-lg shadow-lg bg-blue-500 hover:bg-blue-600 transition-all duration-300">
          Text Steganography
        </Link>
        <Link to="/image" className="btn btn-primary py-2 px-4 text-white rounded-lg shadow-lg bg-green-500 hover:bg-green-600 transition-all duration-300">
          Image Steganography
        </Link>
      </div>
    </div>
  );
};

export default Home;
