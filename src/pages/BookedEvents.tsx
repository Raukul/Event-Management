import { useEffect, useState } from "react";
import { useAuth } from "../utils/authContext";
import { getData } from "../utils/services";
import { collections, events } from "../utils/firebaseconfig";

export default function BookedEvents() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const [bookedEvents, setBookedEvents] = useState<Array<any>>([]);

  const fetchData = async () => {
    try {
      const res = (await getData(collections.BOOKED_EVENTS, user.info.id)) as Array<any>;
      const bookedevents = [...(res || [])];
      const customBookings = [];
      for (let i = 0; i < bookedevents.length; i++) {
        const element = bookedevents[i];
        const getConEvents =
          events.find((items: any) => {
            return items?.category === element?.service;
          }) || {};
        customBookings.push({ ...element, ...getConEvents });
      }

      setBookedEvents(customBookings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          type="button"
          onClick={() => {
            logout();
          }}
          className="w-full bg-purple-600 text-white my-3 px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Logout
        </button>
        <h1 className="text-3xl font-bold text-center mb-8">Your Booked Events</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          {bookedEvents.length === 0 ? (
            <p className="text-center text-gray-600">No events booked yet.</p>
          ) : (
            bookedEvents.map((items: any) => {
              return (
                <div key={items?.info?.id} className="my-3">
                  <img src={items.image} height={"150px"} width={"250px"}/>
                  <div>
                    <h6>{`Name: ${items?.name}`}</h6>
                    <h6>{`Category: ${items?.category}`}</h6>
                    <h6>{`Event Date: ${items?.eventDate}`}</h6>
                    <h6>{`Place: ${items?.city}`}</h6>
                  </div>
                  <h6>{`Description: ${items?.message}`}</h6>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
