import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Booking() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [lastBooking, setLastBooking] = useState(null);
  const router = useRouter();

  const timeSlots = [
    '06:00 - 07:00',
    '07:00 - 08:00',
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00',
    '18:00 - 19:00',
    '19:00 - 20:00',
    '20:00 - 21:00',
    '21:00 - 22:00'
  ];

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Booking confirmed successfully! See you at the gym!');
        setLastBooking({
          date: formData.date,
          timeSlot: formData.timeSlot,
          bookingId: data.booking._id
        });
        setBookingCompleted(true);
        setFormData({ date: '', timeSlot: '' });
      } else {
        if (response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        } else {
          setError(data.error || 'Booking failed');
        }
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleBookAnother = () => {
    setBookingCompleted(false);
    setSuccess('');
    setError('');
    setLastBooking(null);
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                Akhada Gym Membership
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.name}!</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {!bookingCompleted ? (
          // Booking Form
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-gray-900">Book Your Gym Session</h1>
              <p className="mt-2 text-gray-600">Select your preferred date and time slot</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Select Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      min={getTomorrowDate()}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <label key={slot} className="relative">
                          <input
                            type="radio"
                            name="timeSlot"
                            value={slot}
                            checked={formData.timeSlot === slot}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          <div className={`p-3 text-center text-sm font-medium rounded-lg border-2 cursor-pointer transition-all
                            ${formData.timeSlot === slot 
                              ? 'border-blue-500 bg-blue-50 text-blue-700' 
                              : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                            }`}>
                            {slot}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                  </div>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Booking...' : 'Confirm Booking'}
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
                    ← Back to home
                  </Link>
                </div>
              </div>
            </form>
          </>
        ) : (
          // Success State
          <>
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h1>
              <p className="text-lg text-gray-600">Your gym session has been successfully booked.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              {/* Success Message */}
              <div className="text-center mb-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-green-800 mb-2">🎉 See you at the gym!</h2>
                  <p className="text-green-700">Your booking has been confirmed successfully.</p>
                  
                  {lastBooking && (
                    <div className="mt-4 bg-white rounded-md p-4 border border-green-200">
                      <h3 className="font-medium text-gray-900 mb-2">Booking Details:</h3>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p><span className="font-medium">Date:</span> {new Date(lastBooking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><span className="font-medium">Time:</span> {lastBooking.timeSlot}</p>
                        <p><span className="font-medium">Booking ID:</span> {lastBooking.bookingId}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleBookAnother}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                >
                  📅 Book Another Slot
                </button>
                
                <button
                  onClick={handleBackToLogin}
                  className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
                >
                  ← Back to Login Page
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
