// // VideoScreen.jsx
// import { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');

// export default function VideoScreen() {
//   const videoRef = useRef(null);
//   const [currentVideo, setCurrentVideo] = useState('default.mp4');

//   useEffect(() => {
//     console.log('Component mounted');
//     socket.on('play-video', (videoNum) => {
//       console.log(`Received play-video event with videoNum: ${videoNum}`);
//       setCurrentVideo(`${videoNum}.mp4`);
//       console.log(`Current video set to: ${videoNum}.mp4`);
//     });

//     return () => {
//       console.log('Component unmounted, removing socket listener');
//       socket.off('play-video');
//     };
//   }, []);

//   const handleVideoEnd = () => {
//     console.log('Video ended, resetting to default.mp4');
//     setCurrentVideo('default.mp4');
//   };

//   return (
//     <div className="w-full h-screen bg-black">
//            <video
//         ref={videoRef}
//         key={currentVideo}
//         autoPlay
//         muted
//         onEnded={handleVideoEnd}
//         loop={currentVideo === 'default.mp4'} // Loop only the default video
//         className="w-full h-full object-cover"
//       >
//         <source src={`/videos/${currentVideo}`} type="video/mp4" />
//       </video>

//     </div>
//   );
// }


import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function VideoScreen() {
  const videoRef = useRef(null);
  const [currentVideo, setCurrentVideo] = useState('default.mp4');

  useEffect(() => {
    console.log('Component mounted');
    socket.on('play-video', (videoNum) => {
      console.log(`Received play-video event with videoNum: ${videoNum}`);
      setCurrentVideo(`${videoNum}.mp4`);
      console.log(`Current video set to: ${videoNum}.mp4`);
    });

    return () => {
      console.log('Component unmounted, removing socket listener');
      socket.off('play-video');
    };
  }, []);

  const handleVideoEnd = () => {
    console.log('Video ended, resetting to default.mp4');
    setCurrentVideo('default.mp4');
  };

  return (
    <div className="flex items-center justify-center bg-black w-[1080px] h-[1920px] overflow-hidden">
      <video
        ref={videoRef}
        key={currentVideo}
        autoPlay
        muted
        onEnded={handleVideoEnd}
        loop={currentVideo === 'default.mp4'}
        className="w-full h-full object-cover transition-all duration-500"
      >
        <source src={`/videos/${currentVideo}`} type="video/mp4" />
      </video>
    </div>
  );
}
