// App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CaptureScreen from './components/CaptureScreen';
import FormScreen from './components/FormScreen';
import IdleScreen from './components/IdleScreen';
import SelectCharacter from './components/SelectCharacter';
import SuccessScreen from './components/SuccessScreen';
import TakePhoto from './components/TakePhoto';




export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<IdleScreen />} />
        <Route path="/form" element={<FormScreen />} />
        <Route path="/take-photo" element={<TakePhoto />} />

        <Route path="/camera" element={<CaptureScreen />} />
        <Route path="/select-character" element={<SelectCharacter />} />
           <Route path="/success" element={<SuccessScreen />} />
       
      </Routes>
    </Router>
  );
}