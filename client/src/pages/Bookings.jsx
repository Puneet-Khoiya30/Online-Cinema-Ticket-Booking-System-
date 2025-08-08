import React, { useState, useEffect } from 'react';

const TicketBooking = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedShowId, setSelectedShowId] = useState('');
  const [seatsBooked, setSeatsBooked] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [step, setStep] = useState('movies'); // 'movies', 'booking', 'confirmation'

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies');
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data.filter(movie => movie.status === 'now_showing'));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId.toString());
    setSelectedShowId('');
    setSeatsBooked('');
    setStep('booking');
  };

  const handleBackToMovies = () => {
    setStep('movies');
    setSelectedMovieId('');
    setSelectedShowId('');
    setSeatsBooked('');
    setError(null);
    setBookingResponse(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBookingResponse(null);

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1, // You might want to get this from user context/authentication
          show_id: parseInt(selectedShowId),
          seats_booked: parseInt(seatsBooked),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create booking');
      
      setBookingResponse(data);
      setStep('confirmation');
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const selectedMovie = movies.find(movie => movie.movie_id === parseInt(selectedMovieId));
  const availableShows = selectedMovie?.shows || [];

  if (loading && step === 'movies') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center">
        <div className="relative text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-white rounded-full animate-spin mx-auto"></div>
          <p className="text-white mt-4 text-lg font-medium">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            🎬 CinemaBook
          </h1>
          <p className="text-purple-200 text-lg">Book your perfect movie experience</p>
        </div>

        {/* Movies Grid */}
        {step === 'movies' && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Now Showing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie.movie_id}
                  onClick={() => handleMovieSelect(movie.movie_id)}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-white/15 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={movie.image || movie.poster_url || 'https://images.unsplash.com/photo-1489599731893-1455a2e7b7b2?w=400&h=600&fit=crop'}
                      alt={movie.title}
                      className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1489599731893-1455a2e7b7b2?w=400&h=600&fit=crop';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-lg text-sm font-bold">
                      {movie.rating || 'NR'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                      {movie.title}
                    </h3>
                    <p className="text-purple-200 mb-2">{movie.genre || 'Genre not specified'}</p>
                    <p className="text-purple-300 text-sm mb-4">⏱️ {movie.duration || 'Duration not specified'}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-green-400 font-semibold">
                        {movie.shows?.length || 0} Shows Available
                      </div>
                      <div className="text-yellow-300 font-bold">
                        {movie.shows && movie.shows.length > 0 
                          ? `From ${Math.min(...movie.shows.map(s => s.ticket_price))}`
                          : 'Price TBA'
                        }
                      </div>
                    </div>
                    
                    <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                      Book Now 🎫
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Form */}
        {step === 'booking' && selectedMovie && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleBackToMovies}
              className="mb-6 flex items-center text-purple-200 hover:text-white transition-colors"
            >
              <span className="mr-2">←</span> Back to Movies
            </button>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="flex items-center mb-6">
                <img
                  src={selectedMovie.image || selectedMovie.poster_url || 'https://images.unsplash.com/photo-1489599731893-1455a2e7b7b2?w=400&h=600&fit=crop'}
                  alt={selectedMovie.title}
                  className="w-20 h-28 object-cover rounded-lg mr-4"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1489599731893-1455a2e7b7b2?w=400&h=600&fit=crop';
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{selectedMovie.title}</h2>
                  <p className="text-purple-200">{selectedMovie.genre || 'Genre not specified'} • {selectedMovie.duration || 'Duration not specified'}</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Show Selection */}
                <div className="group">
                  <label htmlFor="show" className="block text-sm font-semibold text-purple-200 mb-2 transition-colors group-hover:text-white">
                    ⏰ Select Show Time
                  </label>
                  <select
                    id="show"
                    value={selectedShowId}
                    onChange={(e) => setSelectedShowId(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border-2 border-purple-300/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                  >
                    <option value="" className="text-gray-900">Choose a show</option>
                    {availableShows.map(show => (
                      <option key={show.show_id} value={show.show_id} className="text-gray-900">
                        {new Date(show.show_time).toLocaleString()} - Screen {show.screen_no} (${show.ticket_price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seats Selection */}
                {selectedShowId && (
                  <div className="group animate-fade-in">
                    <label htmlFor="seats" className="block text-sm font-semibold text-purple-200 mb-2 transition-colors group-hover:text-white">
                      🎟️ Number of Seats
                    </label>
                    <input
                      type="number"
                      id="seats"
                      value={seatsBooked}
                      onChange={(e) => setSeatsBooked(e.target.value)}
                      min="1"
                      max={availableShows.find(show => show.show_id === parseInt(selectedShowId))?.available_seats || 1}
                      className="w-full px-4 py-3 bg-white/20 border-2 border-purple-300/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 hover:bg-white/25"
                      placeholder="Enter number of seats"
                      required
                    />
                    <div className="flex items-center mt-2 text-sm text-purple-200">
                      <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      Available seats: {availableShows.find(show => show.show_id === parseInt(selectedShowId))?.available_seats}
                    </div>
                  </div>
                )}

                {/* Booking Summary */}
                {selectedShowId && seatsBooked && (
                  <div className="bg-white/10 rounded-lg p-4 animate-fade-in">
                    <h3 className="text-white font-semibold mb-2">Booking Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between text-purple-200">
                        <span>Movie:</span>
                        <span className="text-white">{selectedMovie.title}</span>
                      </div>
                      <div className="flex justify-between text-purple-200">
                        <span>Seats:</span>
                        <span className="text-white">{seatsBooked}</span>
                      </div>
                      <div className="flex justify-between text-purple-200">
                        <span>Price per ticket:</span>
                        <span className="text-white">${availableShows.find(show => show.show_id === parseInt(selectedShowId))?.ticket_price}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t border-white/20 pt-2 mt-2">
                        <span className="text-purple-200">Total:</span>
                        <span className="text-green-300">${(availableShows.find(show => show.show_id === parseInt(selectedShowId))?.ticket_price || 0) * parseInt(seatsBooked || 0)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Booking Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !selectedShowId || !seatsBooked}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-400/50"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    '🎫 Confirm Booking'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-200 rounded-xl animate-shake">
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <div>
                <h3 className="font-semibold">Booking Error</h3>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {step === 'confirmation' && bookingResponse && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl p-6 animate-bounce-in">
              <div className="text-center mb-4">
                <span className="text-6xl">🎉</span>
                <h3 className="text-2xl font-bold text-green-300 mt-2">Booking Confirmed!</h3>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-purple-200">Movie:</span>
                  <span className="font-bold text-white">{selectedMovie.title}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-purple-200">Booking ID:</span>
                  <span className="font-bold text-white">{bookingResponse.booking_id}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-purple-200">Booking Code:</span>
                  <span className="font-bold text-yellow-300">{bookingResponse.booking_code}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-purple-200">Seats Booked:</span>
                  <span className="font-bold text-white">{bookingResponse.seats_booked}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-purple-200">Total Amount:</span>
                  <span className="font-bold text-green-300 text-xl">${bookingResponse.total_amount}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/10">
                  <span className="text-purple-200">Status:</span>
                  <span className="px-3 py-1 bg-green-500/30 text-green-200 rounded-full text-sm font-medium">
                    {bookingResponse.status || 'Confirmed'}
                  </span>
                </div>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-purple-200 text-sm mb-4">
                  📧 Confirmation details have been sent to your email
                </p>
                <button
                  onClick={handleBackToMovies}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                >
                  Book Another Movie
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.8); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TicketBooking;