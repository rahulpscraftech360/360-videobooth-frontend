// // FormScreen.jsx
// import axios from 'axios';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function FormScreen() {
//   const [formData, setFormData] = useState({ name: '', email: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         await axios.post('http://localhost:5000/api/users', formData);
//       navigate('/buttons');
//     } catch (error) {
//       console.error('Submission failed:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
//         <input
//           type="text"
//           placeholder="Name"
//           required
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           className="w-full p-2 mb-4 border border-gray-300 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           required
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="w-full p-2 mb-4 border border-gray-300 rounded"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }

// FormScreen.jsx
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormScreen() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/api/users', formData);
      document.activeElement.blur(); // Close keyboard on submit
      navigate('/buttons');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-3">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-center text-gray-700">User Form</h2>
        <input
          type="text"
          placeholder="Name"
          required
          onFocus={(e) => e.target.setAttribute('inputmode', 'text')}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          required
          onFocus={(e) => e.target.setAttribute('inputmode', 'email')}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
