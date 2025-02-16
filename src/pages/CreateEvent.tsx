import { Controller, useForm } from "react-hook-form";
import { addData } from "../utils/services";
import { collections, events } from "../utils/firebaseconfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

export default function CreateEvent() {
  const { control, handleSubmit } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleFormsSubmit = async (data: any) => {
    try {
      await addData(
        collections.BOOKED_EVENTS,
        {
          ...data,
        },
        user.info.id
      );
      alert("Event Booked successfully!");
      navigate("/booked");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Create Your Event</h1>

          <form onSubmit={handleSubmit(handleFormsSubmit)} className="space-y-6">
            <Controller
              control={control}
              name="name"
              rules={{
                required: "This field is required",
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input type="text" id="name" name="name" value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                    <p>{error?.message}</p>
                  </div>
                );
              }}
            />

            <Controller
              name="phone"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone" value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                    <p>{error?.message}</p>
                  </div>
                );
              }}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                    <p>{error?.message}</p>
                  </div>
                );
              }}
            />

            <Controller
              name="city"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      Your City
                    </label>
                    <input type="text" id="city" name="city" value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                    <p>{error?.message}</p>
                  </div>
                );
              }}
            />

            <Controller
              name="eventDate"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <div>
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                      Event Date
                    </label>
                    <input type="date" id="eventDate" name="eventDate" min={"2025-02-16"} value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                    <p>{error?.message}</p>
                  </div>
                );
              }}
            />

            <Controller
              name="service"
              control={control}
              rules={{
                required: "This field is required",
              }}
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                      Required Service
                    </label>
                    <select id="service" name="service" value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                      <option value="">Select a service</option>
                      {events.map((items, index) => {
                        return (
                          <option key={index} value={items.category}>
                            {items.title}
                          </option>
                        );
                      })}
                    </select>
                    <p>{error?.message}</p>
                  </div>
                );
              }}
            />

            <Controller
              control={control}
              name="message"
              render={({ field: { value, onChange }, fieldState: { error } }) => {
                return (
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message (optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    ></textarea>
                    <p>{error?.message}</p>
                  </div>
                );
              }}
            />

            <div>
              <button type="submit" className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
