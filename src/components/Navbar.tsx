import { CalendarDays, Calendar, PlusCircle, BookCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <CalendarDays className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EventPro</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              <Calendar className="h-5 w-5 mr-1" />
              Events Dashboard
            </Link>
            <Link to="/events" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              <BookCheck className="h-5 w-5 mr-1" />
              Event Details
            </Link>
            <Link to="/create" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              <PlusCircle className="h-5 w-5 mr-1" />
              Create Event
            </Link>
            <Link to="/booked" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              <Calendar className="h-5 w-5 mr-1" />
              Booked Events
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}