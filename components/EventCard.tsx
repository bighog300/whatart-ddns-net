import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const categoryBadgeColor = (category) => {
  switch (category) {
    case 'Exhibition': return 'bg-purple-100 text-purple-800';
    case 'Auction': return 'bg-blue-100 text-blue-800';
    case 'Opening': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const EventCard = ({ _id, title, date, location, category, image, featured }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative">
      {featured && (
        <div className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
          ⭐ Featured
        </div>
      )}
      <div className="border p-4 rounded shadow hover:shadow-lg block bg-white cursor-pointer" onClick={() => setShowModal(true)}>
        {image && (
          <Image src={image} alt={title} width={400} height={240} className="w-full h-48 object-cover rounded mb-2" loading="lazy" />
        )}
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold leading-snug">{title}</h3>
          {category && <span className={`text-xs px-2 py-1 rounded ${categoryBadgeColor(category)}`}>{category}</span>}
        </div>
        <p className="text-sm text-gray-600">{date} • {location}</p>
      </div>
      {showModal && image && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="bg-white p-4 rounded shadow max-w-xl">
            <img src={image} alt={title} className="rounded max-h-[80vh]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
