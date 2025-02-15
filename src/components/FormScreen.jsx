import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormScreen() {
  const [formData, setFormData] = useState({ name: '', email: '', gender: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.gender) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      console.log('Form submitted:', formData); // Debugging log
      navigate('/select-character', { state: { name: formData.name, email: formData.email, gender: formData.gender } });
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url(/images/iPad.png)' }}
    >
      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Enter your name"
            className="block w-full px-4 py-3 mt-2 text-xl font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:ring-blue-600 focus:border-blue-600 peer"
            style={{ fontFamily: 'Arial, sans-serif', height: '75px', backgroundImage: 'url(/images/bluebutton.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="block w-full px-4 py-3 mt-5 text-xl font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:ring-blue-600 focus:border-blue-600 peer"
            style={{ fontFamily: 'Arial, sans-serif', height: '75px', backgroundImage: 'url(/images/bluebutton.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <select
            className="block w-full px-4 py-3 mt-5 text-xl font-semibold text-gray-800 bg-white border border-gray-300 rounded shadow appearance-none focus:outline-none focus:ring-blue-600 focus:border-blue-600 peer"
            style={{ fontFamily: 'Arial, sans-serif', height: '75px', backgroundImage: 'url(/images/bluebutton.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          >
            <option value="" disabled style={{ color: '#a9a9a9' }}>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {error && <p className="text-red-500 mt-3">{error}</p>}
          <button
            className="w-full px-4 py-2 mt-6 font-bold text-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            style={{
              backgroundImage: 'url(/images/redbutton.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '75px',
              fontFamily: 'Arial, sans-serif',
              border: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}