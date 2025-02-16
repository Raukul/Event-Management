export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-4">Create Unforgettable Events</h1>
              <p className="text-xl mb-8">Professional event planning services for every occasion</p>
              <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to EventPro</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We specialize in creating memorable events that exceed expectations. From intimate gatherings 
              to grand celebrations, our team of experienced event planners ensures every detail is perfect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Planning</h3>
              <p className="text-gray-600">Professional event planners with years of experience</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Attention to Detail</h3>
              <p className="text-gray-600">Every aspect of your event is carefully considered</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl">💫</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Memorable Experiences</h3>
              <p className="text-gray-600">Creating moments that last a lifetime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}