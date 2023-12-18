import { useState, useEffect } from "react";
import { View, Flex, Button, useTheme, Heading } from "@aws-amplify/ui-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../../context/GlobalContext";
import { AiOutlinePlus } from "react-icons/ai";

const Appointments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokens } = useTheme();
  const { setIsLoaded } = useGlobalContext();
  const [isSelected, setIsSelected] = useState("upcoming");

  useEffect(() => {
    setIsLoaded(false);
  }, []);

  useEffect(() => {
    setIsSelected(location.pathname.split("/").slice(-1)[0]);
  }, [location]);

  const handleButtonClick = (type: string, path: string) => {
    navigate(`/dashboard/appointments/${path}`);
    setIsSelected(type);
  };

  return (
    <View className="container">
      <Heading className="main-heading">My Appointments</Heading>
      <Flex className="flex-container">
        <Flex className="appointment-section-container">
          {["upcoming", "past", "cancelled"].map((type) => (
            <Button
              key={type}
              id="selectBlueHover"
              borderColor={tokens.colors.background.secondary}
              borderRadius="10px"
              width={{ large: "170px", base: "100px" }}
              style={{
                backgroundColor:
                  isSelected === type
                    ? tokens.colors.background.secondary.toString()
                    : "transparent",
                color:
                  isSelected === type
                    ? tokens.colors.white.toString()
                    : tokens.colors.font.primary.toString(),
              }}
              onClick={() => handleButtonClick(type, type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </Flex>
        <Button
          id="selectBlueHover"
          backgroundColor={tokens.colors.background.secondary}
          color={tokens.colors.white}
          className="book-appointment-button"
          onClick={() => navigate("/dashboard/user")}
        >
          <AiOutlinePlus /> &nbsp; Book an Appointment
        </Button>
      </Flex>
      <View>
        <Outlet />
      </View>
    </View>
  );
};

export default Appointments;
