

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function FormScreen() {
//   const [formData, setFormData] = useState({ name: '', email: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
    
//       navigate('/camera'); // Navigate to the camera screen or any other screen
//     } catch (error) {
//       console.error('Submission failed:', error);
//     }
//   };

//   return  (
//     <div 
//     className="flex items-center justify-center min-h-screen bg-center bg-cover" 
//     style={{ backgroundImage: 'url(/images/iPad.png)' }}
//   >
//       <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
//         <form onSubmit={handleSubmit} className="w-full mt-50 ">
//           <input
//             type="text"
//             placeholder="Enter your name"
//             className="block w-full  px-4 py-3 mt-2 text-xl font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:ring-blue-600 focus:border-blue-600 peer"
//             style={{ fontFamily: 'Arial, sans-serif', height: '75px' ,  backgroundImage: 'url(/images/bluebutton.png)',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',}}
//           />
//           <input
//             type="email"
//             placeholder="  Enter your email"
//             className="block w-full px-4 py-3 mt-5 text-xl font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:ring-blue-600 focus:border-blue-600 peer"
//             style={{ fontFamily: 'Arial, sans-serif', height: '75px',backgroundImage: 'url(/images/bluebutton.png)',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',}} // Added height and font style
         
//           />
//             <button
//             className="w-[250px] h-[60px] sm:w-[200px] sm:h-[50px] lg:w-[300px] lg:h-[70px] px-4 py-2 mt-6 font-bold text-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
//             style={{
//               backgroundImage: 'url(/images/redbutton.png)',
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//               width: '350px', // Adjust width as needed
//               height: '75px', // Adjust height as needed // Adjust height as needed
//               fontFamily: 'Arial, sans-serif',
//               border: 'none', // Remove default button border
//               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow for better visibility
//             }}
//             type="submit"
//           >
//             Continue
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormScreen() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form submitted:', formData); // Debugging log
      navigate('/camera', { state: { name: formData.name, email: formData.email } });
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url(/images/iPad.png)' }}
    >
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="  Enter your name"
            className="block w-full  px-4 py-3 mt-2 text-xl font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:ring-blue-600 focus:border-blue-600 peer"
            style={{ fontFamily: 'Arial, sans-serif', height: '75px' ,  backgroundImage: 'url(/images/bluebutton.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',}}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="  Enter your email"
            className="block w-full px-4 py-3 mt-5 text-xl font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:ring-blue-600 focus:border-blue-600 peer"
            style={{ fontFamily: 'Arial, sans-serif', height: '75px',backgroundImage: 'url(/images/bluebutton.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',}}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <button
            className="w-[250px] h-[60px] sm:w-[200px] sm:h-[50px] lg:w-[300px] lg:h-[70px] px-4 py-2 mt-6 font-bold text-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            style={{
              backgroundImage: 'url(/images/redbutton.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '350px', // Adjust width as needed
              height: '75px', // Adjust height as needed // Adjust height as needed
              fontFamily: 'Arial, sans-serif',
              border: 'none', // Remove default button border
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
              fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
              fontSize: '24px', // Increase font size
            }}
            type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );

}