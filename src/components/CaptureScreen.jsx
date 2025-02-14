// import { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function CaptureScreen() {
//   const navigate = useNavigate();
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [recordedVideo, setRecordedVideo] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);

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

//   const startCountdown = () => {
//     setCountdown(5);
//     const timer = setInterval(() => {
//       setCountdown(prev => {
//         if (prev === 1) {
//           clearInterval(timer);
//           startRecording();
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const startRecording = () => {
//     const mediaRecorder = new MediaRecorder(mediaStream);
//     mediaRecorderRef.current = mediaRecorder;
//     const chunks = [];

//     mediaRecorder.ondataavailable = e => chunks.push(e.data);
//     mediaRecorder.onstop = () => {
//       const blob = new Blob(chunks, { type: 'video/mp4' });
//       setRecordedVideo(blob);
//     };

//     mediaRecorder.start();
//     setRecording(true);

//     setTimeout(() => {
//       mediaRecorder.stop();
//       setRecording(false);
//     }, 5000);
//   };

//   const handleRetake = () => {
//     setRecordedVideo(null);
//     setCountdown(0);
//   };

//   const handleSend = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('video', recordedVideo, 'recording.mp4');

//       await axios.post('http://localhost:5000/api/videos', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       navigate('/success');
//     } catch (error) {
//       console.error('Failed to send video:', error);
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-center bg-cover"
//       style={{ backgroundImage: 'url(/images/bg1.png)' }}
//     >
//       <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         <div className="w-full max-w-2xl">
//           <h1 className="text-5xl font-bold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
//             SMILE FOR<br />THE CAMERA
//           </h1>

//           <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
//             <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
            
//             {countdown > 0 && (
//               <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-white">
//                 {countdown}
//               </div>
//             )}
//           </div>

//           <div className="mt-8">
//             {!recordedVideo ? (
//               <button
//                 className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
//                 style={{ fontSize: '1.5rem', height: '50px' }}
//                 onClick={startCountdown}
//                 disabled={countdown > 0 || recording}
//               >
//                 {recording ? 'Recording...' : 'Capture'}
//               </button>
//             ) : (
//               <div className="flex gap-4">
//                 <button
//                   className="flex-1 px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700"
//                   style={{ height: '50px' }}
//                   onClick={handleRetake}
//                 >
//                   Retake
//                 </button>
//                 <button
//                   className="flex-1 px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
//                   style={{ height: '50px' }}
//                   onClick={handleSend}
//                 >
//                   Send
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CaptureScreen() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

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

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(timer);
          startRecording();
        }
        return prev - 1;
      });
    }, 1000);
  };

  const startRecording = () => {
    const mediaRecorder = new MediaRecorder(mediaStream);
    mediaRecorderRef.current = mediaRecorder;
    const chunks = [];

    mediaRecorder.ondataavailable = e => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      setRecordedVideo(blob);
    };

    mediaRecorder.start();
    setRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setRecording(false);
    }, 5000);
  };

  const handleRetake = () => {
    setRecordedVideo(null);
    setCountdown(0);
  };

  const handleSend = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('video', recordedVideo, 'recording.mp4');

      await axios.post('http://localhost:5000/api/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/success');
    } catch (error) {
      console.error('Failed to send video:', error);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setFailed(false);
    setRecordedVideo(null);
    setCountdown(0);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url(/images/iPad.png)' }}
    >
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="w-full max-w-2xl">
          <h1 className="text-4xl mt-20 font-semibold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
            SMILE FOR<br />THE CAMERA
          </h1>

          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
            
            {countdown > 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-8xl font-bold text-white">
                {countdown}
              </div>
            )}
          </div>

          <div className="mt-8">
            {!recordedVideo ? (
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
                onClick={startCountdown}
                disabled={countdown > 0 || recording}
              >
                {recording ? 'Recording...' : 'Capture'}
              </button>
            ) : (
              // <div className="flex gap-4">
              <><button
                  className="flex-1 px-4 py-2 font-bold bg-white text-red-600 focus:outline-none focus:shadow-outline"
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
                <button
                  className="flex-1 px-4 py-2 mt-5 font-bold text-white bg-green-500 rounded hover:bg-green-700"
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
                  onClick={handleSend}
                >
                  Send
                </button></>  
              // </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading Screen */}
      {loading && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90"
    style={{ backgroundImage: 'url(/images/iPad.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="text-center animate-pulse">
      <div className="text-white text-6xl font-bold mb-4">Sending...</div>
      <div className="flex justify-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
)}

{/* Failed Popup */}
{failed && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90"
    style={{ backgroundImage: 'url(/images/iPad.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <div className="bg-white p-10 rounded-lg text-center shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
      <h2 className="text-4xl font-bold text-red-600 mb-6">Failed</h2>
      <p className="text-gray-700 text-lg mb-8">Something went wrong. Please try again.</p>
      <button
        className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
        onClick={handleTryAgain}
      >
        Try Again
      </button>
    </div>
  </div>
)}
    </div>
  );
}