import Link from 'next/link';
const Navbar = () => (
  <nav className="bg-white shadow p-4 flex justify-between">
    <Link href="/" className="text-2xl font-bold text-purple-600">Art Pulse</Link>
    <Link href="/calendar" className="text-sm text-gray-700 hover:underline">Calendar</Link>
  </nav>
);
export default Navbar;
