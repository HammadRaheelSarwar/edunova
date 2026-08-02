import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
import MeetingDetails from './pages/MeetingDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/meetings/:id" element={<MeetingDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
