 

import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
 
 

function App() {
  return (
    <Router>
      <div>
          

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />


 
          

           
        </Routes>
      </div>
    </Router>
  );
}

export default App;