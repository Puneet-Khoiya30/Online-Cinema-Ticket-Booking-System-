import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


// Simulated Link component since react-router-dom isn't available
// const Link = ({ to, children, className, ...props }) => (
//   <a 
//     href={to} 
//     className={className}
//     onClick={(e) => {
//       e.preventDefault();
//       alert(`Navigation to: ${to}\n\nIn a real app, this would navigate to the ${to} page.`);
//     }}
//     {...props}
//   >
//     {children}
//   </a>
// );

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden bg-black/20 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">
            🎬 <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">Multiplex Theater</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the magic of cinema with premium seating, crystal-clear sound, and the latest blockbusters
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/movies" 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl cursor-pointer"
            >
              🎭 All Movies
            </Link>
            <Link 
              to="/my-bookings" 
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl cursor-pointer"
            >
              📋 My Bookings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          What would you like to do?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Movies Card */}
          <Link to="/movies" className="group cursor-pointer">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 hover:from-red-900 hover:to-slate-900 transition-all duration-500 transform hover:scale-105 hover:rotate-1 shadow-2xl border border-slate-700 hover:border-red-500">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎬</div>
              <h3 className="text-2xl font-bold text-white mb-3">Movies</h3>
              <p className="text-gray-400 group-hover:text-gray-300">Browse all current movies and upcoming releases</p>
            </div>
          </Link>

          {/* Shows Card */}
          <Link to="/shows" className="group cursor-pointer">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 hover:from-purple-900 hover:to-slate-900 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 shadow-2xl border border-slate-700 hover:border-purple-500">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎭</div>
              <h3 className="text-2xl font-bold text-white mb-3">Shows</h3>
              <p className="text-gray-400 group-hover:text-gray-300">View all showtimes and theater schedules</p>
            </div>
          </Link>

          {/* Book Movie Card */}
          <Link to="/bookings/1" className="group cursor-pointer">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 hover:from-green-900 hover:to-slate-900 transition-all duration-500 transform hover:scale-105 hover:rotate-1 shadow-2xl border border-slate-700 hover:border-green-500">
              <div className="text-5xl mb-4 group-hover:animate-bounce">🎫</div>
              <h3 className="text-2xl font-bold text-white mb-3">Book Now</h3>
              <p className="text-gray-400 group-hover:text-gray-300">Quick booking for your favorite movies</p>
            </div>
          </Link>

          {/* My Bookings Card */}
          <Link to="/my-bookings" className="group cursor-pointer">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 hover:from-blue-900 hover:to-slate-900 transition-all duration-500 transform hover:scale-105 hover:-rotate-1 shadow-2xl border border-slate-700 hover:border-blue-500">
              <div className="text-5xl mb-4 group-hover:animate-bounce">📱</div>
              <h3 className="text-2xl font-bold text-white mb-3">My Bookings</h3>
              <p className="text-gray-400 group-hover:text-gray-300">View and manage your ticket bookings</p>
            </div>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-black/30 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-600 to-red-700 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4 shadow-xl">1</div>
              <h3 className="text-xl font-semibold text-white mb-2">Browse Movies</h3>
              <p className="text-gray-400">Explore our collection of latest movies and upcoming releases</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4 shadow-xl">2</div>
              <h3 className="text-xl font-semibold text-white mb-2">Select Showtime</h3>
              <p className="text-gray-400">Choose your preferred date, time, and theater location</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4 shadow-xl">3</div>
              <h3 className="text-xl font-semibold text-white mb-2">Pick Seats</h3>
              <p className="text-gray-400">Select your favorite seats from our interactive seat map</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4 shadow-xl">4</div>
              <h3 className="text-xl font-semibold text-white mb-2">Get Tickets</h3>
              <p className="text-gray-400">Receive instant confirmation and mobile tickets</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Why Choose Multiplex Theater?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="text-4xl mb-4">🎪</div>
            <h3 className="text-2xl font-bold text-white mb-3">Premium Experience</h3>
            <p className="text-gray-400">Luxury seating, Dolby Atmos sound, and 4K projection for the ultimate movie experience</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold text-white mb-3">Instant Booking</h3>
            <p className="text-gray-400">Quick and easy online booking with instant confirmation and mobile tickets</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <div className="text-4xl mb-4">🍿</div>
            <h3 className="text-2xl font-bold text-white mb-3">Complete Service</h3>
            <p className="text-gray-400">From snacks to premium seating, everything you need for a perfect movie night</p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="bg-black/40 backdrop-blur-sm py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Quick Links
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/movies" className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer">
              View Movies & Schedules
            </Link>
            <Link to="/schedules/1" className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer">
              See Schedules
            </Link>
            <Link to="/bookings/1" className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-6 py-3 rounded-lg transition-all duration-300 cursor-pointer">
              Book Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-sm text-gray-500 mb-4">
            <span className="font-semibold">Tech Stack:</span> React + React Router + Tailwind CSS | 
            Backend: Node.js + Express + MySQL | 
            APIs: /api/movies, /api/bookings, /api/schedules
          </div>
          <p className="text-gray-400">© 2025 Multiplex Theater. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}