import NavBar from "./NavBar";
import ScreenWrapper from "../../components/globals/screenWrapper";
import HeroSection from "./HeroSection";
import SignUp from "../../components/auth/SignUp";
import Login from "../../components/auth/Login";
import Pricing from "./Pricing";
import Features from "./Features";
import Contact from "./Contact";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import Loader from "../../components/globals/Loader";
//Hompe page
const HomePage = () => {
  const { logInModal, signUpModal } = useGlobalContext();

  return (
    <>
      {signUpModal && <SignUp />}
      {logInModal && <Login />}
      <Outlet />
      <ScreenWrapper>
        <Loader />
        <NavBar />
        <HeroSection />
        {/* <Features /> */}
        {/* <Pricing /> */}
        <Contact />
      </ScreenWrapper>
      <Footer />
    </>
  );
};

export default HomePage;
