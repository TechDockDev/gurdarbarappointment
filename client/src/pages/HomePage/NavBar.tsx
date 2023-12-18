import { useState } from "react";
import { View, Flex, Heading, Button, Divider } from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";

const NavBar = () => {
  const { tokens } = useTheme();
  // const { setSignUpModal } = useGlobalContext();
  const [hidden, SetHidden] = useState<Boolean>(true);
  const { isAuthenticated, authData } = useGlobalContext();
  const navigate = useNavigate();
  const handleHideButton = () => {
    SetHidden(!hidden);
  };

  return (
    <>
      <View
        as="button"
        display={{ large: "none", base: "block" }}
        onClick={handleHideButton}
        width="10%"
        borderRadius={"15px"}
        backgroundColor={"transparent"}
        margin={"20px"}
        textAlign={"center"}
        color={tokens.colors.font.primary}
        className="amplify_hidden_button"
      >
        {hidden ? (
          <GiHamburgerMenu
            style={{
              color: "white",
              fontSize: "28px",
            }}
          />
        ) : (
          <AiOutlineClose
            style={{
              fontSize: "28px",
              color: "white",
            }}
          />
        )}
      </View>
      <Flex
        direction={{ large: "row", base: "column" }}
        alignItems={{ large: "center" }}
        position={{ large: "", base: "absolute" }}
        justifyContent={{ large: "space-between" }}
        paddingTop={"20px"}
        width="100%"
        backgroundColor={{ large: "", base: "#FFFFFF" }}
        color={{ large: "#FFFFFF", base: `${tokens.colors.font.primary}` }}
        className="amplify_navbar"
        top={hidden ? "-10000px" : "80px"}
        height={{ base: "100%", large: "" }}
      >
        <Flex
          direction={{ large: "row", base: "column" }}
          justifyContent={"center"}
          alignItems={"center"}
          // gap={{ large: "85px" }}
        >
          <img src="/logo.svg" width={"50px"} />
          <Heading
            level={4}
            textAlign={"center"}
            paddingRight={"51px"}
            color={{
              large: "#FFFFFF",
              base: `${tokens.colors.font.primary}`,
            }}
          >
            Gurudwara
          </Heading>
          <Divider
            display={{ large: "none", base: "block" }}
            color={{ base: `${tokens.colors.font.primary}` }}
          ></Divider>
          <Flex
            direction={{ large: "row", base: "column" }}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={{ large: "40px" }}
          >
            <View as="div" className="amplify_navbar_fields" fontSize={"20px"}>
              <View as="a" href="/" className="navlink" data-hover="Home">
                Home
              </View>
            </View>
            {/* <View
              as="div"
              className="amplify_navbar_fields"
              fontSize={"20px"}
              onClick={handleHideButton}
            >
              <View
                as="a"
                href="/#pricing"
                className="navlink"
                data-hover="Pricing"
              >
                Pricing
              </View>
            </View> */}
            <View
              as="div"
              className="amplify_navbar_fields"
              fontSize={"20px"}
              onClick={handleHideButton}
            >
              <View
                as="a"
                href="/#contact"
                className="navlink"
                data-hover="Contact us"
              >
                Contact us
              </View>
            </View>
          </Flex>
        </Flex>
        <Flex
          direction={{ large: "row", base: "column" }}
          alignItems={"center"}
          display={isAuthenticated ? "none" : ""}
        >
          <View
            className="amplify_login_button"
            fontSize={"24px"}
            id="link_color"
            onClick={() => {
              // setLogInModal(true);
              document.body.style.overflow = "hidden";
            }}
          >
            <Link to="/login">
              <View color={{ large: "#ffff" }}>Login</View>
            </Link>
          </View>
          <Link to="/signup">
            <Button
              position={"relative"}
              fontSize={"24px"}
              width={"160px"}
              fontWeight={400}
              backgroundColor={tokens.colors.background.primary}
              color={tokens.colors.font.primary}
              className="hover-button-effect"
              onClick={() => {
                document.body.style.overflow = "hidden";
              }}
            >
              Sign up
            </Button>
          </Link>
        </Flex>

        <Flex
          direction={{ large: "row", base: "column" }}
          alignItems={"center"}
          display={isAuthenticated ? "" : "none"}
        >
          <Button
            position={"relative"}
            fontSize={"24px"}
            width={"160px"}
            fontWeight={600}
            backgroundColor={tokens.colors.background.primary}
            color={tokens.colors.font.primary}
            onClick={() => {
              navigate(
                `/dashboard/${
                  authData["custom:role"] === "Sangat"
                    ? "user"
                    : "serviceProvider"
                }`
              );
            }}
          >
            Dashboard
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default NavBar;
