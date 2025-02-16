import { CalendarDays, Calendar, User, BookCheck, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { auth, collections } from "../utils/firebaseconfig";
import { addData, getData } from "../utils/services";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Dialog, TextField, Typography } from "@mui/material";

export default function Navbar() {
  const { user, login } = useAuth();
  const { control, handleSubmit } = useForm({ mode: "onChange" });
  const { control: signupControl, handleSubmit: signupSubmit, watch: signupWatch } = useForm({ mode: "onChange" });

  const [isLogged, setisLogged] = useState(false);
  const [openSignup, setSignup] = useState(false);

  const handleLoginModal = () => {
    setisLogged(!isLogged);
  };

  const handleSignupModal = () => {
    setSignup(!openSignup);
  };

  const handleLogin = async (data: any) => {
    try {
      await login(data);
    } catch (error) {
      handleLoginModal();
      handleSignupModal();
      console.error("Error during login:", error);
    }
  };

  const handleSignup = async (data: any) => {
    const getUsers = (await getData(collections.USERS)) as Array<any>;

    const findEmail = getUsers?.find((items: any) => {
      return items?.email === data.email;
    });

    if (findEmail) {
      alert("User already exist go to signin!");
      handleSignupModal();
      setisLogged(true);
      return;
    }

    debugger;
    const response: any = await createUserWithEmailAndPassword(auth, data.email, data.confirmPassword);
    await addData(collections.USERS, {
      email: data.email,
      name: data.name,
      phone: data.phone,
      uid: response.user.uid,
    });

    const UserUID = response?._tokenResponse?.localId;
    if (UserUID) {
      alert("Login successful");
      handleSignupModal();
    }
  };

  useEffect(() => {
    if (user) {
      setisLogged(false);
    } else {
      setisLogged(true);
    }
  }, [user]);

  return (
    <>
      <Dialog
        open={isLogged}
        onClose={() => {
          handleLoginModal();
        }}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "20px",
            width: "100%",
          },
        }}
      >
        <form onSubmit={handleSubmit(handleLogin)} className="d-flex flex-column gap-2 p-3">
          <h6 className="fw-bold mb-2">Please Login To Continue</h6>
          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input type="email" id="email" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                </div>
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input type="password" id="password" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500" />
                </div>
              );
            }}
          />
          <button type="submit" className="mt-4">
            Login
          </button>
          <div
            style={{ paddingTop: "10px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "16px" }}
            onClick={() => {
              handleSignupModal();
            }}
          >
            Don't have an account?&nbsp; <span style={{ color: "#be4f8e", textDecoration: "underline" }}>Sign up here</span>
          </div>
        </form>
      </Dialog>
      <Dialog
        open={openSignup}
        onClose={() => {
          handleSignupModal();
        }}
        PaperProps={{
          style: {
            borderRadius: "20px",
            padding: "20px",
            width: "100%",
          },
        }}
      >
        <form onSubmit={signupSubmit(handleSignup)} className="d-flex flex-column gap-2 p-3">
          <Typography variant="h6" className="fw-bold mb-2">
            Join us!
          </Typography>
          <Controller
            name="name"
            control={signupControl}
            render={({ field }) => {
              return <TextField label={"username"} type="text" {...field} fullWidth variant="outlined" className="mb-3" />;
            }}
          />
          <Controller
            name="phone"
            control={signupControl}
            render={({ field }) => {
              return <TextField label={"Mobile Number"} type="text" {...field} fullWidth variant="outlined" className="mb-3" />;
            }}
          />
          <Controller
            name="email"
            control={signupControl}
            render={({ field }) => {
              return <TextField label={"Email"} type="email" {...field} fullWidth variant="outlined" className="mb-3" />;
            }}
          />
          <Controller
            name="password"
            control={signupControl}
            render={({ field }) => {
              return <TextField label={"Password"} type="password" {...field} fullWidth variant="outlined" className="mb-3" />;
            }}
          />
          <Controller
            name="confirmPassword"
            control={signupControl}
            rules={{
              validate: (data) => {
                return data === signupWatch("password") || "Password is not same!";
              },
            }}
            render={({ field, fieldState: { error } }) => {
              return <TextField error={error?.message ? true : false} helperText={error?.message} disabled={!signupWatch("password")} label={"Confirm Password"} type="password" {...field} fullWidth variant="outlined" />;
            }}
          />
          <Button sx={{ backgroundColor: "#be4f8e" }} type="submit" fullWidth variant="contained" color="primary" className="mt-4">
            Sign Up
          </Button>
        </form>
      </Dialog>
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
              {/* <Link to="/booked" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                <Calendar className="h-5 w-5 mr-1" />
                Booked Events
              </Link> */}
              {user && (
                <Link to="/booked" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
