import { useNavigate } from 'react-router-dom';

export default function SuccessScreen() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home screen
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover relative"
      style={{ backgroundImage: 'url(/images/bg_sucess.png)' }}
    >
      <div className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-8 lg:px-20 text-center">
        <div className="absolute bottom-[10%] sm:bottom-[10%] w-full flex justify-center">
          <button
            className="w-[90%] sm:w-[350px] h-[60px] sm:h-[75px] bg-cover bg-center font-bold text-red-600 focus:outline-none focus:shadow-outline"
            style={{
              backgroundImage: 'url(/images/redbutton.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '20px', // Smaller font size for mobile
              border: 'none',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            }}
            onClick={handleGoHome}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}