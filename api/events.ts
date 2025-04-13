import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;
const API_KEY = process.env.API_KEY as string;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGO_URI);
};

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  category: String,
  description: String,
  image: String,
  featured: Boolean
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST' && req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();

  if (req.method === 'GET') {
    const events = await Event.find().sort({ date: 1 });
    return res.status(200).json(events);
  }

  if (req.method === 'POST') {
    const newEvent = await Event.create(req.body);
    return res.status(201).json({ success: true, event: newEvent });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
