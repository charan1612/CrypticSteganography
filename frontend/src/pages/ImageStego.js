// frontend/src/pages/ImageStego.js

import React, { useState } from 'react';
import axios from 'axios';

const ImageStego = () => {
  const [carrierImage, setCarrierImage] = useState(null);
  const [hiddenImage, setHiddenImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState(null);

  const [stegoImage, setStegoImage] = useState(null);
  const [decodedImage, setDecodedImage] = useState(null);
  const [hiddenWidth, setHiddenWidth] = useState('');
  const [hiddenHeight, setHiddenHeight] = useState('');

  const handleEncode = async (e) => {
    e.preventDefault();
    if (!carrierImage || !hiddenImage) {
      alert('Please provide both carrier and hidden images.');
      return;
    }

    const formData = new FormData();
    formData.append('carrier_image', carrierImage);
    formData.append('hidden_image', hiddenImage);

    try {
      const response = await axios.post('http://localhost:5000/api/encode_image', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setEncodedImage(url);
    } catch (error) {
      console.error(error);
      alert('Error encoding image.');
    }
  };

  const handleDecode = async (e) => {
    e.preventDefault();
    if (!stegoImage || !hiddenWidth || !hiddenHeight) {
      alert('Please provide stego image and hidden image dimensions.');
      return;
    }

    const formData = new FormData();
    formData.append('image', stegoImage);
    formData.append('width', hiddenWidth);
    formData.append('height', hiddenHeight);

    try {
      const response = await axios.post('http://localhost:5000/api/decode_image', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDecodedImage(url);
    } catch (error) {
      console.error(error);
      alert('Error decoding image.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Image Steganography</h2>

            {/* Encode Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Encode Image into Image</h3>
              <form onSubmit={handleEncode} className="space-y-4">
                <div>
                  <label className="block mb-1">Carrier Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCarrierImage(e.target.files[0])}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Hidden Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setHiddenImage(e.target.files[0])}
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Encode Image
                </button>
              </form>

              {encodedImage && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Encoded Image:</h4>
                  <img src={encodedImage} alt="Encoded" className="mt-2 max-w-full h-auto" />
                  <a href={encodedImage} download="encoded_image.png" className="text-blue-500 mt-2 block">
                    Download Encoded Image
                  </a>
                </div>
              )}
            </div>

            {/* Decode Section */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Decode Image from Stego Image</h3>
              <form onSubmit={handleDecode} className="space-y-4">
                <div>
                  <label className="block mb-1">Stego Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setStegoImage(e.target.files[0])}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Hidden Image Width:</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-sm"
                    value={hiddenWidth}
                    onChange={(e) => setHiddenWidth(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1">Hidden Image Height:</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-sm"
                    value={hiddenHeight}
                    onChange={(e) => setHiddenHeight(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  Decode Image
                </button>
              </form>

              {decodedImage && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Decoded Image:</h4>
                  <img src={decodedImage} alt="Decoded" className="mt-2 max-w-full h-auto" />
                  <a href={decodedImage} download="decoded_image.png" className="text-blue-500 mt-2 block">
                    Download Decoded Image
                  </a>
                </div>
              )}
            </div>
          </div>
    </div>
    
  );
};

export default ImageStego;
