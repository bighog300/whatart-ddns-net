import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { fetchEventById } from '../../utils/api';

const EventDetail = () => {
  const { query } = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (query.id) fetchEventById(query.id).then(setEvent);
  }, [query.id]);

  if (!event) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <p className="text-sm text-gray-600 mb-4">{event.date} • {event.location} • {event.category}</p>
        {event.image && <img src={event.image} alt={event.title} className="w-full h-auto mb-4 rounded" />}
        <p>{event.description}</p>
      </main>
      <Footer />
    </>
  );
};

export default EventDetail;
