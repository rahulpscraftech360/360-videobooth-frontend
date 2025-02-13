// import { useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// export default function ButtonScreen() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const navigate = useNavigate();
//   const [playingAudio, setPlayingAudio] = useState(null); // State to track the currently playing audio number
//   const audioFiles = [1, 2, 3, 4, 5];
//   const currentAudioRef = useRef(null); // Ref to track the currently playing audio

//   const handleButtonClick = (num) => {
//     console.log(`Button ${num} clicked`);
    
//     // Stop the currently playing audio (if any)
//     if (currentAudioRef.current) {
//       console.log('Stopping currently playing audio');
//       currentAudioRef.current.pause();
//       currentAudioRef.current.currentTime = 0; // Reset audio to the start
//     }

//     // Start playing the new audio
//     const audio = new Audio(`/audio/${num}.mp3`);
//     currentAudioRef.current = audio; // Store the new audio in the ref
//     console.log(`Starting to play audio: /audio/${num}.mp3`);
//     setPlayingAudio(num); 
//     audio.play();
//   setIsPlaying(true);

//     // Send signal to play the corresponding video
//     console.log(`Emitting play-video event for video number: ${num}`);
//     socket.emit('play-video', num);

//     // Re-enable buttons after audio finishes
//     audio.onended = () => {
//         setIsPlaying(false);
//       console.log('Audio ended');
//       setPlayingAudio(null);
//     };

//     // Start 15-second timeout for auto-navigation
//     console.log('Starting 15-second timeout for auto-navigation');
//     const timeout = setTimeout(() => {
//       console.log('15-second timeout reached, navigating to /');
//       navigate('/');
//     }, 15000);

//     // Clear timeout if any button is clicked again
//     const resetTimeout = () => {
//       console.log('Button clicked again, clearing and resetting timeout');
//       clearTimeout(timeout);
//         setIsPlaying(true);
//       const newTimeout = setTimeout(() => {
//         console.log('15-second timeout reached again, navigating to /');
//         navigate('/');
//       }, 15000);
//     };

//     // Add event listeners to buttons to reset timeout
//     audioFiles.forEach((num) => {
//       const button = document.getElementById(`button-${num}`);
//       if (button) {
//         console.log(`Adding event listener to button-${num}`);
//         button.addEventListener('click', resetTimeout);
//       }
//     });

//     // Cleanup
//     return () => {
//       console.log('Cleaning up: clearing timeout and removing event listeners');
//       clearTimeout(timeout);
//       audioFiles.forEach((num) => {
//         const button = document.getElementById(`button-${num}`);
//         if (button) {
//           console.log(`Removing event listener from button-${num}`);
//           button.removeEventListener('click', resetTimeout);
//         }
//       });
//     };
//   };

//   return (
//     <div className="min-h-screen p-4 relative bg-gray-100 flex flex-col items-center justify-center">
//       <div className="max-w-6xl mx-auto space-y-4 w-full">
//         {/* Top row */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {audioFiles.slice(0, 3).map((num) => (
//             <button
//               key={num}
//               id={`button-${num}`}
//               disabled={isPlaying}
//               onClick={() => handleButtonClick(num)}
//               className={`border border-red-500 rounded-lg p-4 flex items-center justify-center text-4xl w-full min-h-[100px] transition-colors ${
//                 playingAudio === num ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'
//               } hover:bg-green-600 disabled:bg-gray-400`}
//             >
//               {num}
//             </button>
//           ))}
//         </div>

//         {/* Bottom row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {audioFiles.slice(3).map((num) => (
//             <button
//               key={num}
//               id={`button-${num}`}
//               disabled={isPlaying}
//               onClick={() => handleButtonClick(num)}
//               className={`border border-red-500 rounded-lg p-4 flex items-center justify-center text-4xl w-full min-h-[100px] transition-colors ${
//                 playingAudio === num ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'
//               } hover:bg-green-600 disabled:bg-gray-400`}
//             >
//               {num}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Back button */}
//       <div className="absolute bottom-4 right-4">
//         <button
//           onClick={() => navigate('/')}
//           className="border border-red-500 rounded-lg px-6 py-2 text-red-500 hover:bg-red-50 transition-colors"
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// }



import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function ButtonScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);
  const navigate = useNavigate();
  const currentAudioRef = useRef(null);
  const timeoutRef = useRef(null); // Ref to track the timeout
  const audioFiles = [1, 2, 3, 4, 5];

  const handleButtonClick = (num) => {
    console.log(`Button ${num} clicked`);

    // Stop the currently playing audio (if any)
    if (currentAudioRef.current) {
      console.log('Stopping currently playing audio');
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      console.log('Clearing previous timeout');
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Start playing the new audio
    const audio = new Audio(`/audio/${num}.mp3`);
    currentAudioRef.current = audio;
    setPlayingAudio(num);
    setIsPlaying(true);

    console.log(`Starting to play audio: /audio/${num}.mp3`);
    audio.play();

    // Send signal to play the corresponding video
    console.log(`Emitting play-video event for video number: ${num}`);
    socket.emit('play-video', num);

    // Once the audio ends, start a 15-second timeout for navigation
    audio.onended = () => {
      console.log('Audio ended');
      setIsPlaying(false);
      setPlayingAudio(null);

      console.log('Starting 15-second timeout for auto-navigation');
      timeoutRef.current = setTimeout(() => {
        console.log('15-second timeout reached, navigating to /');
        navigate('/');
      }, 15000);
    };
  };

  return (
    <div className="min-h-screen p-4 relative bg-gray-100 flex flex-col items-center justify-center">
      <div className="max-w-6xl mx-auto space-y-4 w-full">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {audioFiles.slice(0, 3).map((num) => (
            <button
              key={num}
              disabled={isPlaying}
              onClick={() => handleButtonClick(num)}
              className={`border border-red-500 rounded-lg p-4 flex items-center justify-center text-4xl w-full min-h-[100px] transition-colors ${
                playingAudio === num ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'
              } hover:bg-green-600 disabled:bg-gray-400`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {audioFiles.slice(3).map((num) => (
            <button
              key={num}
              disabled={isPlaying}
              onClick={() => handleButtonClick(num)}
              className={`border border-red-500 rounded-lg p-4 flex items-center justify-center text-4xl w-full min-h-[100px] transition-colors ${
                playingAudio === num ? 'bg-blue-500 text-white' : 'bg-green-500 text-black'
              } hover:bg-green-600 disabled:bg-gray-400`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Back button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={() => navigate('/')}
          className="border border-red-500 rounded-lg px-6 py-2 text-red-500 hover:bg-red-50 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
