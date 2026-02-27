import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CoupleArea from "./pages/CoupleArea";
import PhotographerPanel from "./pages/PhotographerPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/couple/:name" element={<CoupleArea />} />
        <Route path="/photographer" element={<PhotographerPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;