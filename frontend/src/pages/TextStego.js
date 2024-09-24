// frontend/src/pages/TextStego.js

import React, { useState } from 'react';
import axios from 'axios';

const TextStego = () => {
  const [message, setMessage] = useState('');
  const [carrierImage, setCarrierImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState(null);
  const [decodedText, setDecodedText] = useState('');
  const [decodeImage, setDecodeImage] = useState(null);

  const handleEncode = async (e) => {
    e.preventDefault();
    if (!carrierImage || !message) {
      alert('Please provide both image and message.');
      return;
    }

    const formData = new FormData();
    formData.append('image', carrierImage);
    formData.append('message', message + '###'); // Append delimiter

    try {
      const response = await axios.post('http://localhost:5000/api/encode_text', formData, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setEncodedImage(url);
    } catch (error) {
      console.error(error);
      alert('Error encoding message.');
    }
  };

  const handleDecode = async (e) => {
    e.preventDefault();
    if (!decodeImage) {
      alert('Please provide an image to decode.');
      return;
    }

    const formData = new FormData();
    formData.append('image', decodeImage);

    try {
      const response = await axios.post('http://localhost:5000/api/decode_text', formData);
      setDecodedText(response.data.hidden_text);
    } catch (error) {
      console.error(error);
      alert('Error decoding message.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Text Steganography</h2>

            {/* Encode Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Encode Text into Image</h3>
              <form onSubmit={handleEncode} className="space-y-4">
                <div>
                  <label className="block mb-1">Message:</label>
                  <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-md shadow-sm"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block mb-1">Carrier Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCarrierImage(e.target.files[0])}
                    required
                  />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  Encode Text
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
              <h3 className="text-xl font-semibold mb-2">Decode Text from Image</h3>
              <form onSubmit={handleDecode} className="space-y-4">
                <div>
                  <label className="block mb-1">Stego Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setDecodeImage(e.target.files[0])}
                    required
                  />
                </div>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  Decode Text
                </button>
              </form>

              {decodedText && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Decoded Text:</h4>
                  <p className="mt-2">{decodedText}</p>
                </div>
              )}
            </div>
          </div>
    </div>
    
  );
};

export default TextStego;
