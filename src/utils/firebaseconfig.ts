import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIl3gQ0J8ZAtMPCFWSXrb4Z9BlXJQajfw",
  authDomain: "events-3b394.firebaseapp.com",
  projectId: "events-3b394",
  storageBucket: "events-3b394.firebasestorage.app",
  messagingSenderId: "142269367650",
  appId: "1:142269367650:web:8c3e85173074217c53983b",
  measurementId: "G-WFE71TE42N",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const collections = {
  BOOKED_EVENTS: "bookedEvents",
  USERS: "users",
  PAYMENT: "payments",
};

export const events = [
  {
    title: "Birthday Celebrations",
    image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Make your birthday special with our customized celebration packages.",
    category: "birthday",
  },
  {
    title: "Wedding Ceremonies",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Create the wedding of your dreams with our expert planning services.",
    category: "wedding",
  },
  {
    title: "College Culturals",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Organize vibrant cultural events for your college.",
    category: "culturals",
  },
  {
    title: "House Warming",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Welcome friends and family to your new home with our house warming packages.",
    category: "housewarming",
  },
  {
    title: "Puberty Function",
    image: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Celebrate this special milestone with our traditional arrangements.",
    category: "puberty",
  },
];
