// App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ButtonScreen from './components/ButtonScreen';
import FormScreen from './components/FormScreen';
import VideoScreen from './screens/VideoScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormScreen />} />
           {/* <Route path="/" element={<ButtonScreen />} /> */}
        <Route path="/buttons" element={<ButtonScreen />} />
        <Route path="/video" element={<VideoScreen />} />
      </Routes>
    </Router>
  );
}