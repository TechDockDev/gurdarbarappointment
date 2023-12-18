import { useEffect } from "react";
import { Amplify } from "aws-amplify";
import config from "./aws-exports.js";
import HomePage from "./pages/HomePage/HomePage";
import ConfirmSignUp from "./components/auth/ConfirmSignUp.js";
import { useRoutes } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Dashboard from "./pages/Dashboard/header/Dashboard";
import Appointments from "./pages/Dashboard/appointments/Appointments";
import Profile from "./pages/Dashboard/profile/Profile";
import UpComing from "./pages/Dashboard/appointments/UpComing";
import Past from "./pages/Dashboard/appointments/Past";
import Cancelled from "./pages/Dashboard/appointments/Cancelled";
import User from "./pages/Dashboard/usersLanding/User";
import ServiceProvider from "./pages/Dashboard/serviceProviderLanding/ServiceProvider";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import { useGlobalContext } from "./context/GlobalContext";
import ScheduleSettings from "./pages/Dashboard/schedules/ScheduleSettings.js";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/auth/ForgotPassword";
import ServiceProfile from "./pages/Dashboard/profile/ServiceProfile";
import { useLocation } from "react-router-dom";
import BookDemo from "./pages/HomePage/BookDemo";

Amplify.configure(config);

const router = (authData: any) => [
  {
    element: <Dashboard />,
    path: "/dashboard",
    children:
      authData["custom:role"] === "Sangat"
        ? [
            {
              element: <User />,
              path: "user",
            },
            {
              element: <Profile />,
              path: "profile",
            },
            {
              element: <Appointments />,
              path: "appointments",
              children: [
                {
                  element: <UpComing />,
                  path: "upcoming",
                },
                {
                  element: <Past />,
                  path: "past",
                },
                {
                  element: <Cancelled />,
                  path: "cancelled",
                },
              ],
            },
          ]
        : authData["custom:role"] === "Gurudwara Sahib"
        ? [
            {
              element: <ScheduleSettings />,
              path: "serviceProvider/scheduleSettings",
            },
            {
              element: <ServiceProvider />,
              path: "serviceProvider",
              // children: [
              //   {
              //     element: <UpComing />,
              //     path: "cancelAppointment",
              //   },
              // ],
            },
            {
              element: <ServiceProfile />,
              path: "serviceProvider/profile",
            },
          ]
        : [],
  },
  {
    element: <HomePage />,
    path: "/",
    children: [
      {
        element: <SignUp />,
        path: "/signup",
      },
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ConfirmSignUp />,
        path: "/confirm",
      },
      {
        element: <ForgotPassword />,
        path: "/forgotpassword",
      },
    ],
  },
  {
    element: <BookDemo />,
    path: "/book-a-demo",
  },
  {
    element: <HomePage />,
    path: "*",
  },
];

const App = () => {
  const { isAuthenticated, setIsAuthenticated, authData } = useGlobalContext();

  const { route } = useAuthenticator((context) => [context.route]);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("dashboard") && isAuthenticated) {
      document.body.style.backgroundColor = "#F7F8FA";
    } else {
      document.body.style.backgroundColor = "#1C469A";
    }
  }, [pathname, isAuthenticated]);

  useEffect(() => {
    if (route === "authenticated") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [route]);

  useEffect(() => {
    const { hash } = location;

    if (hash) {
      setTimeout(() => {
        const targetElement = document.querySelector(hash);

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "instant" });
        }
      }, 100);
    } else {
      // Scroll to the top if no hash is present
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  const routes = useRoutes(router(authData));
  return routes;
};

export default App;
