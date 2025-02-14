// App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CaptureScreen from './components/CaptureScreen';
import FormScreen from './components/FormScreen';
import IdleScreen from './components/IdleScreen';
import SuccessScreen from './components/SuccessScreen';


export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<IdleScreen />} />
        <Route path="/form" element={<FormScreen />} />
        <Route path="/camera" element={<CaptureScreen />} />

           <Route path="/success" element={<SuccessScreen />} />
       
      </Routes>
    </Router>
  );
}