import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Logged/login';
import Register from './components/Logged/register';
import MovieDetail from './Detail/detail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/detail"  element={<MovieDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
