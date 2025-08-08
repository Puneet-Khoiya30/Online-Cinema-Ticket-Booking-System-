import React, { useState, useEffect } from 'react';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading movies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{movie.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{movie.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Genre:</span> {movie.genre}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Duration:</span> {movie.duration_minutes} minutes
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Release Date:</span>{' '}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Status:</span>{' '}
                  <span
                    className={`capitalize ${
                      movie.status === 'now_showing'
                        ? 'text-green-600'
                        : movie.status === 'coming_soon'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }`}
                  >
                    {movie.status.replace('_', ' ')}
                  </span>
                </p>
              </div>
              {movie.status === 'now_showing' && (
                <button
                  className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onClick={() => alert(`Book tickets for ${movie.title}`)} // Placeholder for booking navigation
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;