// import { createClient } from '@supabase/supabase-js';
// import { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// export default function TakePhoto() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { name, email, gender, character } = location.state || { name: '', email: '', gender: '', character: '' };

//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [photo, setPhoto] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [timer, setTimer] = useState(0);
//   const [isCapturing, setIsCapturing] = useState(false);


 

// // Initialize Supabase client
// const supabaseUrl = 'https://fuhqxfbyvrklxggecynt.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHF4ZmJ5dnJrbHhnZ2VjeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODk0MzcsImV4cCI6MjA1MzQ2NTQzN30.0r2cHr8g6nNwjaVaVGuXjo9MXNFu9_rx40j5Bb3Ib2Q';
// const supabase = createClient(supabaseUrl, supabaseKey);

//   // Initialize camera
//   useEffect(() => {
//     const initializeCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         setMediaStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       } catch (error) {
//         console.error('Error accessing camera:', error);
//       }
//     };

//     initializeCamera();

//     return () => {
//       if (mediaStream) {
//         mediaStream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, []);

//   const capturePhoto = () => {
//     setIsCapturing(true);
//     setTimer(3); // Start the timer for 3 seconds

//     const countdown = setInterval(() => {
//       setTimer(prevTimer => {
//         if (prevTimer === 0) {
//           clearInterval(countdown);
//           setIsCapturing(false);
//           const video = videoRef.current;
//           const canvas = canvasRef.current;
//           const context = canvas.getContext('2d');

//           // Set canvas dimensions to match video stream
//           canvas.width = video.videoWidth;
//           canvas.height = video.videoHeight;

//           // Draw the current video frame onto the canvas
//           context.drawImage(video, 0, 0, canvas.width, canvas.height);

//           // Convert canvas image to a data URL (base64)
//           const photoDataUrl = canvas.toDataURL('image/png');
//           setPhoto(photoDataUrl);
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleRetake = async () => {
//     setPhoto(null); // Clear the photo to show the camera feed again
//     setIsCapturing(false);

//     // Restart the video feed
//     if (mediaStream) {
//       mediaStream.getTracks().forEach(track => track.stop());
//     }

//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       setMediaStream(stream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (error) {
//       console.error('Error accessing camera:', error);
//     }
//   };

// //   const handleContinue = () => {
// //     if (!photo) {
// //       alert('Please take a photo before continuing!');
// //       return;
// //     }

// //     // Navigate to the CaptureScreen with form data and photo
// //     navigate('/camera', { state: { name, email, gender, character, photo } });
// //   };

// const handleContinue = async () => {
//     if (!photo) {
//       alert('Please take a photo before continuing!');
//       return;
//     }

//     // Convert base64 image to a Blob
//     const blob = await fetch(photo).then(res => res.blob());

//     // Upload the photo to Supabase Storage
//     const filePath = `photos/${Date.now()}.png`;
//     const { error } = await supabase.storage
//       .from('360video')
//       .upload(filePath, blob);

//     if (error) {
//       console.error('Error uploading photo:', error);
//       alert('Failed to upload photo. Please try again.');
//       return;
//     } 


//     // Get the public URL of the uploaded photo
//     const { data: { publicUrl } } = supabase.storage
//       .from('360video')
//       .getPublicUrl(filePath);
//    console.log(publicUrl);
//     // Navigate to the camera page with form data and photo URL
//    // navigate('/camera', { state: { name, email, gender, character, photo: publicUrl } });
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-center bg-cover"
//       style={{ backgroundImage: 'url(/images/iPad.png)' }}
//     >
//       <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         <h1 className="text-4xl mt-20 font-semibold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
//           TAKE A PHOTO
//         </h1>

//         <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
//           {photo ? (
//             // Show the captured photo preview
//             <img src={photo} alt="Captured Photo" className="w-full h-full object-cover" />
//           ) : (
//             // Show the live camera feed
//             <>
//               <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
//               {isCapturing && (
//                 <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">
//                   {timer}
//                 </div>
//               )}
//             </>
//           )}
//           <canvas ref={canvasRef} className="hidden" />
//         </div>

//         <div className="mt-8">
//           {photo ? (
//             // Show "Retake" and "Continue" buttons after capturing a photo
//             <>
//               <div className="mb-4">
//                 <button
//                   style={{
//                     backgroundImage: 'url(/images/redbutton.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     width: '350px', // Adjust width as needed
//                     height: '75px',  // Adjust height as needed
//                     fontFamily: 'Arial, sans-serif',
//                     color: 'red',
//                     fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
//                     fontSize: '24px', // Increase font size
//                     border: 'none', // Remove default button border
//                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
//                   }}
//                   onClick={handleRetake}
//                 >
//                   Retake
//                 </button>
//               </div>
//               <div>
//                 <button
//                   style={{
//                     backgroundImage: 'url(/images/greenbutton.png)',
//                     backgroundSize: 'cover',
//                     backgroundPosition: 'center',
//                     width: '350px', // Adjust width as needed
//                     height: '75px',  // Adjust height as needed
//                     fontFamily: 'Arial, sans-serif',
//                     color: 'red',
//                     fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
//                     fontSize: '24px', // Increase font size
//                     border: 'none', // Remove default button border
//                     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
//                   }}
//                   onClick={handleContinue}
//                 >
//                   Continue to Video
//                 </button>
//               </div>
//             </>
//           ) : (
//             // Show "Capture Photo" button when no photo is taken
//             <button
//               style={{
//                 backgroundImage: 'url(/images/redbutton.png)',
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 width: '350px', // Adjust width as needed
//                 height: '75px',  // Adjust height as needed
//                 fontFamily: 'Arial, sans-serif',
//                 color: 'red',
//                 fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
//                 fontSize: '24px', // Increase font size
//                 border: 'none', // Remove default button border
//                 boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
//               }}
//               onClick={capturePhoto}
//               disabled={isCapturing}
//             >
//               {isCapturing ? 'Capturing...' : 'Capture Photo'}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { createClient } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Initialize Supabase client
// // Initialize Supabase client
const supabaseUrl = 'https://fuhqxfbyvrklxggecynt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHF4ZmJ5dnJrbHhnZ2VjeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODk0MzcsImV4cCI6MjA1MzQ2NTQzN30.0r2cHr8g6nNwjaVaVGuXjo9MXNFu9_rx40j5Bb3Ib2Q';
const supabase = createClient(supabaseUrl, supabaseKey);


export default function TakePhoto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, gender, character } = location.state || { name: '', email: '', gender: '', character: '' };

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const [error, setError] = useState(null); // Track error messages

  // Initialize camera
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setMediaStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    initializeCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    setIsCapturing(true);
    setTimer(3); // Start the timer for 3 seconds

    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer === 0) {
          clearInterval(countdown);
          setIsCapturing(false);
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const context = canvas.getContext('2d');

          // Set canvas dimensions to match video stream
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          // Draw the current video frame onto the canvas
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Convert canvas image to a data URL (base64)
          const photoDataUrl = canvas.toDataURL('image/png');
          setPhoto(photoDataUrl);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleRetake = async () => {
    setPhoto(null); // Clear the photo to show the camera feed again
    setIsCapturing(false);

    // Restart the video feed
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
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
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl mt-20 font-semibold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
          TAKE A PHOTO
        </h1>

        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          {photo ? (
            // Show the captured photo preview
            <img src={photo} alt="Captured Photo" className="w-full h-full object-cover" />
          ) : (
            // Show the live camera feed
            <>
              <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
              {isCapturing && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-bold">
                  {timer}
                </div>
              )}
            </>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="mt-8">
          {photo ? (
            // Show "Retake" and "Continue" buttons after capturing a photo
            <>
              <div className="mb-4">
                <button
                  style={{
                    backgroundImage: 'url(/images/redbutton.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '350px', // Adjust width as needed
                    height: '75px',  // Adjust height as needed
                    fontFamily: 'Arial, sans-serif',
                    color: 'red',
                    fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
                    fontSize: '24px', // Increase font size
                    border: 'none', // Remove default button border
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
                  }}
                  onClick={handleRetake}
                >
                  Retake
                </button>
              </div>
              <div>
                <button
                  style={{
                    backgroundImage: 'url(/images/greenbutton.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '350px', // Adjust width as needed
                    height: '75px',  // Adjust height as needed
                    fontFamily: 'Arial, sans-serif',
                    color: 'red',
                    fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
                    fontSize: '24px', // Increase font size
                    border: 'none', // Remove default button border
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
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
              style={{
                backgroundImage: 'url(/images/redbutton.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '350px', // Adjust width as needed
                height: '75px',  // Adjust height as needed
                fontFamily: 'Arial, sans-serif',
                color: 'red',
                fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
                fontSize: '24px', // Increase font size
                border: 'none', // Remove default button border
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
              }}
              onClick={capturePhoto}
              disabled={isCapturing}
            >
              {isCapturing ? 'Capturing...' : 'Capture Photo'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}