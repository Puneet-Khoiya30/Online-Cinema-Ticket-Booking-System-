import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Schedules() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/movies?id=${movieId}`)
      .then(res => {
        setMovie(res.data[0] || null);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch schedules');
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading schedules…</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!movie) return <p>No movie found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{movie.title}</h1>
      <h3>Schedules</h3>
      {movie.schedules.length === 0 && <p>No schedules available.</p>}
      <ul>
        {movie.schedules.map(s => (
          <li key={s.id}>
            {s.show_date} {s.show_time} — ₹{s.ticket_price}  
            ({s.seats_total - s.seats_booked} seats left)  
            <button 
              onClick={() => navigate(`/bookings/${s.id}`)}
              style={{ marginLeft: 10 }}
            >
              Book Now
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: 20 }}>
        <Link to="/movies">← Back to Movies</Link>
      </div>
    </div>
  );
}
