import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SelectCharacter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, email, gender } = location.state || { name: '', email: '', gender: '' };

  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Character images based on gender
  const characters = {
    male: ['/images/male_1.jpeg', '/images/male_2.jpeg'],
    female: ['/images/female_1.jpeg', '/images/female_2.jpeg'],
  };

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
  };

  const handleSubmit = () => {
    if (!selectedCharacter) {
      alert('Please select a character!');
      return;
    }

    // Navigate to the Camera page with updated form data
    navigate('/take-photo', { state: { name, email, gender, character: selectedCharacter } });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: 'url(/images/iPad.png)' }}
    >
      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-2xl sm:text-4xl mt-10 sm:mt-20 font-semibold text-white mb-4 sm:mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
          SELECT YOUR CHARACTER
        </h1>

        <div className="flex flex-wrap justify-center gap-4">
          {characters[gender].map((character, index) => (
          <img
          key={index}
          src={character}
          alt={`Character ${index + 1}`}
          className={`h-48 sm:h-72 w-auto cursor-pointer rounded-lg ${
            selectedCharacter === character ? 'border-4 border-blue-500' : ''
          } object-cover`}
          onClick={() => handleCharacterSelect(character)}
        />
          ))}
        </div>

        <button
          className="w-full sm:w-[350px] px-4 py-2 mt-6 font-bold text-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
          style={{
            backgroundImage: 'url(/images/redbutton.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '60px', // Adjust height as needed
            fontFamily: 'Arial, sans-serif',
            border: 'none', // Remove default button border
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            fontWeight: 'bold', // Use fontWeight instead of font: 'bold'
            fontSize: '20px', // Adjust font size for mobile
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}