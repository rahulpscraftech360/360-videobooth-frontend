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
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <div className="absolute bottom-[20%] w-full flex justify-center">
       
          <button
             className="px-8 py- font-bold text-red-600 focus:outline-none focus:shadow-outline"
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
            onClick={handleGoHome}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}