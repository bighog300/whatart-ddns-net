import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import { fetchEvents } from '../utils/api';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchLocation = event.location.toLowerCase().includes(location.toLowerCase());
    const matchDate = selectedDate ? new Date(event.date).toDateString() === new Date(selectedDate).toDateString() : true;
    const matchCategory = category ? event.category === category : true;
    return matchLocation && matchDate && matchCategory;
  });

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Art Event Calendar</h1>
        <div className="mb-6 space-y-4">
          <input type="text" placeholder="Filter by location" value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded p-2 w-full" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 w-full">
            <option value="">All Categories</option>
            <option value="Exhibition">Exhibition</option>
            <option value="Auction">Auction</option>
            <option value="Opening">Opening</option>
          </select>
        </div>
        <div className="bg-white p-4 rounded shadow my-6">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredEvents.map((event) => <EventCard key={event._id} {...event} />)}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CalendarPage;
