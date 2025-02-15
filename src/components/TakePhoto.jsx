import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = 'https://fuhqxfbyvrklxggecynt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHF4ZmJ5dnJrbHhnZ2VjeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODk0MzcsImV4cCI6MjA1MzQ2NTQzN30.0r2cHr8g6nNwjaVaVGuXjo9MXNFu9_rx40j5Bb3Ib2Q';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function TakePhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, gender, character } = location.state || { name: '', email: '', gender: '', character: '' };

  const [photo, setPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [error, setError] = useState(null); // Track error messages

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetake = () => {
    setPhoto(null); // Clear the photo to show the camera feed again
  };

  const handleContinue = async () => {
    if (!photo) {
      alert('Please take a photo before continuing!');
      return;
    }

    setIsUploading(true); // Start loading
    setError(null); // Clear any previous errors

    try {
      // Convert base64 image to a Blob
      const blob = await fetch(photo).then(res => res.blob());

      // Upload the photo to Supabase Storage
      const filePath = `photos/${Date.now()}.png`;
      const { error } = await supabase.storage
        .from('360video')
        .upload(filePath, blob);

      if (error) {
        throw error;
      }

      // Get the public URL of the uploaded photo
      const { data: { publicUrl } } = supabase.storage
        .from('360video')
        .getPublicUrl(filePath);
      console.log(`photourl:${publicUrl}`);
      // Navigate to the camera page with form data and photo URL
      navigate('/camera', { state: { name, email, gender, character, photo: publicUrl } });
    } catch (error) {
      console.error('Error uploading photo:', error);
      setError('Failed to upload photo. Please try again.'); // Set error message
    } finally {
      setIsUploading(false); // Stop loading
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url(/images/iPad.png)' }}
    >
      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-2xl sm:text-3xl mt-10 sm:mt-20 font-semibold text-white mb-4 sm:mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
          TAKE A PHOTO
        </h1>

        {/* Photo Capture Area */}
        <div className="relative w-full max-w-2xl aspect-video flex justify-center items-center rounded-lg overflow-hidden ">
          {photo ? (
            // Show the captured photo preview
            <img
              src={photo}
              alt="Captured Photo"
                    className="w-full h-full object-contain"
            />
          ) : (
            // Show a placeholder when no photo is taken
            <div className="text-gray-500">No photo captured</div>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleCapture}
          className="hidden"
          id="fileInput"
        />

        {/* Buttons */}
        <div className="mt-3 sm:mt-8 w-full max-w-md">
          {photo ? (
            // Show "Retake" and "Continue" buttons after capturing a photo
            <>
              <div className="mb-4">
                <button
                  className="w-[90%] sm:w-[320px] h-[60px] sm:h-[65px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
                  style={{
                    backgroundImage: 'url(/images/redbutton.png)',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={handleRetake}
                >
                  Retake
                </button>
              </div>
              <div>
                <button
                  className="w-[90%] sm:w-[320px] h-[60px] sm:h-[65px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
                  style={{
                    backgroundImage: 'url(/images/greenbutton.png)',
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={handleContinue}
                  disabled={isUploading} // Disable button while uploading
                >
                  {isUploading ? (
                    <div className="flex items-center justify-center">
                      <span>Uploading...</span>
                      <div className="ml-2 animate-spin">🔄</div> {/* Loading spinner */}
                    </div>
                  ) : (
                    'Continue to Video'
                  )}
                </button>
              </div>
              {error && (
                <div className="mt-4 text-red-500">
                  {error}
                </div>
              )}
            </>
          ) : (
            // Show "Capture Photo" button when no photo is taken
            <button
              className="w-[90%] sm:w-[320px] h-[60px] sm:h-[65px] bg-cover bg-center font-bold text-red-500 rounded focus:outline-none focus:shadow-outline"
              style={{
                backgroundImage: 'url(/images/redbutton.png)',
                fontFamily: 'Arial, sans-serif',
                fontSize: '20px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              }}
              onClick={() => document.getElementById('fileInput').click()}
            >
              Capture Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}