import React, { useState, useEffect } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hardcoded user_id for demo; in a real app, get from auth context
  const userId = 1;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`/api/my-bookings?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading bookings...</div>
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
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-600">No bookings found.</div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.booking_id}
              className="bg-white shadow-md rounded-lg p-6 border-l-4 border-indigo-500"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{booking.movie_title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Show Time:</span>{' '}
                    {new Date(booking.show_time).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Screen:</span> {booking.screen_no}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Genre:</span> {booking.genre}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Duration:</span> {booking.duration_minutes} minutes
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Seats Booked:</span> {booking.seats_booked}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total Amount:</span> ${booking.total_amount}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Booking Code:</span> {booking.booking_code}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`capitalize ${
                        booking.status === 'booked' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Booked On:</span>{' '}
                    {new Date(booking.booking_time).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;