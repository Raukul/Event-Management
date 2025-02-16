import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { getData } from "./services";
import { auth, collections, db } from "./firebaseconfig";

const AuthContext = createContext<any>({});

export const AuthProvider: React.FunctionComponent<any> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<any>("ADMIN");
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid) {
        const userDoc = await getData(collections.USERS);
        if (Array.isArray(userDoc)) {
          const userDatas = userDoc?.find((items) => {
            return items?.uid === user?.uid;
          });
          if (userDoc) {
            setUser(userDatas);
            setRole(userDatas?.role);
          }
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [trigger]);

  // Login function
  const login = async (data: any) => {
    const response = await signInWithEmailAndPassword(auth, data.email, data.password);
    setTrigger(trigger + 1);
    return response;
  };

  // Logout function
  const logout = async () => {
    await auth.signOut();
    setTrigger(trigger + 1);
  };

  // Register function (creating a user in Firestore)
  const register = async (data: any) => {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);

      // Create a user document in Firestore
      await addDoc(collection(db, collections.USERS), {
        uid: userCredential.user.uid,
        email: data.email,
        role: "USER",
        createdAt: new Date(),
      });
      await login(data);
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  };

  return <AuthContext.Provider value={{ user, role, login, logout, register, setTrigger, trigger }}>{loading ? <div className="circular-loader"></div> : children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
