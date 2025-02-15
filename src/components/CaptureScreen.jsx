
// import { createClient } from '@supabase/supabase-js';
// import { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// // Initialize Supabase client

// const supabaseUrl = 'https://fuhqxfbyvrklxggecynt.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHF4ZmJ5dnJrbHhnZ2VjeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODk0MzcsImV4cCI6MjA1MzQ2NTQzN30.0r2cHr8g6nNwjaVaVGuXjo9MXNFu9_rx40j5Bb3Ib2Q';
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default function CaptureScreen() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { name, email, gender, character, photo } = location.state || {
//     name: '',
//     email: '',
//     gender: '',
//     character: '',
//     photo: '',
//   };

//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const [recording, setRecording] = useState(false);
//   const [countdown, setCountdown] = useState(0);
//   const [recordedVideo, setRecordedVideo] = useState(null);
//   const [mediaStream, setMediaStream] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [failed, setFailed] = useState(false);

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
//     setCountdown(3);
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
//     setLoading(true);
//     setFailed(false);

//     try {
//       // Step 1: Upload video to Supabase Storage
//       const filePath = `videos/${Date.now()}.mp4`;
//       const { error: uploadError } = await supabase.storage
//         .from('360video')
//         .upload(filePath, recordedVideo);

//       if (uploadError) {
//         throw uploadError;
//       }

//       // Step 2: Get the public URL of the uploaded video
//       const { data: { publicUrl } } = supabase.storage
//         .from('360video')
//         .getPublicUrl(filePath);
//       console.log(`video url :${publicUrl}`);
//       // Step 3: Combine form data with video URL
//       const payload = {
//         name,
//         email,
//         gender,
//         character,
//         photo,
//         video: publicUrl,
//       };
      
//       // Step 4: Send data to your API
//       const response = await fetch('https://your-api-endpoint.com/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to send data to API');
//       }

//       // Navigate to success page
//       navigate('/success');
//     } catch (error) {
//       console.error('Error:', error);
//       setFailed(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTryAgain = () => {
//     setFailed(false);
//     setRecordedVideo(null);
//     setCountdown(0);
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-center bg-cover"
//       style={{ backgroundImage: 'url(/images/iPad.png)' }}
//     >
//       <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         <div className="w-full max-w-2xl">
//           <h1 className="text-4xl mt-20 font-semibold text-white mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
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
//                 style={{
//                   backgroundImage: 'url(/images/redbutton.png)',
//                   backgroundSize: 'cover',
//                   backgroundPosition: 'center',
//                   width: '350px',
//                   height: '75px',
//                   fontFamily: 'Arial, sans-serif',
//                   color: 'red',
//                   fontWeight: 'bold',
//                   fontSize: '24px',
//                   border: 'none',
//                   boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//                 }}
//                 onClick={startCountdown}
//                 disabled={countdown > 0 || recording}
//               >
//                 {recording ? 'Recording...' : 'Capture'}
//               </button>
//             ) : (
//               <>
//                 <div className="mb-4">
//                   <button
//                     style={{
//                       backgroundImage: 'url(/images/redbutton.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       width: '350px',
//                       height: '75px',
//                       fontFamily: 'Arial, sans-serif',
//                       color: 'red',
//                       fontWeight: 'bold',
//                       fontSize: '24px',
//                       border: 'none',
//                       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//                     }}
//                     onClick={handleRetake}
//                   >
//                     Retake
//                   </button>
//                 </div>
//                 <div>
//                   <button
//                     style={{
//                       backgroundImage: 'url(/images/greenbutton.png)',
//                       backgroundSize: 'cover',
//                       backgroundPosition: 'center',
//                       width: '350px',
//                       height: '75px',
//                       fontFamily: 'Arial, sans-serif',
//                       color: 'red',
//                       fontWeight: 'bold',
//                       fontSize: '24px',
//                       border: 'none',
//                       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
//                     }}
//                     onClick={handleSend}
//                   >
//                     Send
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Loading Screen */}
//       {loading && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90"
//           style={{ backgroundImage: 'url(/images/iPad.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
//         >
//           <div className="text-center animate-pulse">
//             <div className="text-white text-6xl font-bold mb-4">Sending...</div>
//             <div className="flex justify-center">
//               <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Failed Popup */}
//       {failed && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90"
//           style={{ backgroundImage: 'url(/images/iPad.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
//         >
//           <div className="bg-white p-10 rounded-lg text-center shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
//             <h2 className="text-4xl font-bold text-red-600 mb-6">Failed</h2>
//             <p className="text-gray-700 text-lg mb-8">Something went wrong. Please try again.</p>
//             <button
//               className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all duration-200 transform hover:scale-105"
//               onClick={handleTryAgain}
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { createClient } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Initialize Supabase client
const supabaseUrl = 'https://fuhqxfbyvrklxggecynt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHF4ZmJ5dnJrbHhnZ2VjeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODk0MzcsImV4cCI6MjA1MzQ2NTQzN30.0r2cHr8g6nNwjaVaVGuXjo9MXNFu9_rx40j5Bb3Ib2Q';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function CaptureScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, gender, character, photo } = location.state || {
    name: '',
    email: '',
    gender: '',
    character: '',
    photo: '',
  };

  const videoRef = useRef(null); // For live camera feed
  const previewVideoRef = useRef(null); // For recorded video preview
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
          videoRef.current.play(); // Ensure the video plays
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setFailed(true); // Show error if camera access fails
      }
    };

    initializeCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop()); // Clean up media stream
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

      // Show the preview video
      if (previewVideoRef.current) {
        previewVideoRef.current.src = URL.createObjectURL(blob);
        previewVideoRef.current.style.display = 'block';
        videoRef.current.style.display = 'none'; // Hide the live feed
      }
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

    // Show the live feed and hide the preview
    if (videoRef.current) {
      videoRef.current.style.display = 'block';
    }
    if (previewVideoRef.current) {
      previewVideoRef.current.style.display = 'none';
      previewVideoRef.current.src = ''; // Clear the preview video
    }
  };

  const handleSend = async () => {
    setLoading(true);
    setFailed(false);

    try {
      // Step 1: Upload video to Supabase Storage
      const filePath = `videos/${Date.now()}.mp4`;
      const { error: uploadError } = await supabase.storage
        .from('360video')
        .upload(filePath, recordedVideo);

      if (uploadError) {
        throw uploadError;
      }

      // Step 2: Get the public URL of the uploaded video
      const { data: { publicUrl } } = supabase.storage
        .from('360video')
        .getPublicUrl(filePath);
      console.log(`video url :${publicUrl}`);

      // Step 3: Combine form data with video URL
      const payload = {
        name,
        email,
        gender,
        character,
        photo,
        video: publicUrl,
      };

      // Step 4: Send data to your API
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to send data to API');
      }

      // Navigate to success page
      navigate('/success');
    } catch (error) {
      console.error('Error:', error);
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
            {/* Live camera feed */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              style={{ display: recordedVideo ? 'none' : 'block' }}
            />

            {/* Recorded video preview */}
            <video
              ref={previewVideoRef}
              controls
              className="w-full h-full object-cover"
              style={{ display: recordedVideo ? 'block' : 'none' }}
            />

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
                  width: '350px',
                  height: '75px',
                  fontFamily: 'Arial, sans-serif',
                  color: 'red',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  border: 'none',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                }}
                onClick={startCountdown}
                disabled={countdown > 0 || recording}
              >
                {recording ? 'Recording...' : 'Capture'}
              </button>
            ) : (
              <>
                <div className="mb-4">
                  <button
                    style={{
                      backgroundImage: 'url(/images/redbutton.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '350px',
                      height: '75px',
                      fontFamily: 'Arial, sans-serif',
                      color: 'red',
                      fontWeight: 'bold',
                      fontSize: '24px',
                      border: 'none',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
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
                      width: '350px',
                      height: '75px',
                      fontFamily: 'Arial, sans-serif',
                      color: 'red',
                      fontWeight: 'bold',
                      fontSize: '24px',
                      border: 'none',
                      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    }}
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
              </>
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