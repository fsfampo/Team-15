import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
   <BrowserRouter>
    <div><Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<Register />} />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
