import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Schedules from './pages/Schedules';
import Bookings from './pages/Bookings';
import MyBookings from './pages/My-Bookings';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* <Link to="/">Home</Link> |{' '}
        <Link to="/movies">Movies</Link> */}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/schedules/:movieId" element={<Schedules />} />
        <Route path="/bookings/:scheduleId" element={<Bookings />} />
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}
