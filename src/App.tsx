import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import BookedEvents from "./pages/BookedEvents";
import { AuthProvider } from "./utils/authContext";
import { SnackbarProvider } from "notistack";
import ProtectedRoute from "./utils/helpers";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route path="/events" element={<EventDetails />} />
                <Route
                  path="/create"
                  element={
                    <ProtectedRoute>
                      <CreateEvent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/booked"
                  element={
                    <ProtectedRoute>
                      <BookedEvents />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
