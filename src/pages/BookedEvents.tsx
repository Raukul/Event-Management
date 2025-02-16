export default function BookedEvents() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Your Booked Events</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center text-gray-600">No events booked yet.</p>
        </div>
      </div>
    </div>
  );
}