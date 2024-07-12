import React from 'react';
import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Logged/login';
import Register from './components/Logged/register';
import MovieDetail from './components/Detail/detail'
import More from './components/More/more';
import UserInfo from './components/Info/userInfo';
import { useDispatch} from 'react-redux';
import { setActiveTab } from './controller/SliceReducer/tab';
import TicketDetail from './components/Info/Booking/ticketDetail';
import Room from './components/MovieBooking/Room/room';
import MovieCategory from './components/Category/movieCategory';
import AddFood from './components/Admin/AddFood/addFood';
import MovieAdd from './components/Admin/AddMovie/addMovie';

const ScrollToTop = () => {
  const dispatch = useDispatch();
  const pathname = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname && pathname.hash) {
      const hash = pathname.hash.replace('#', '');
      if (hash) {
        dispatch(setActiveTab(hash));
      }
    }
  }, [ dispatch, pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:prama" element={<MovieDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/more" element={<More />} />
          <Route path="/info" element={<UserInfo />} />
          <Route path="/ticket" element={<TicketDetail />} />
          <Route path="/booking" element={<Room />} />
          <Route path="/category" element={<MovieCategory/>} />
          <Route path="/add" element={<AddFood/>} />
          <Route path="/add/movie" element={<MovieAdd/>} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
