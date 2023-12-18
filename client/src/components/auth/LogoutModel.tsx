import { Flex, Text, View, Button } from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import ModalWrapper from "../globals/ModalWrapper";
import { useGlobalContext } from "../../context/GlobalContext";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const LogoutModel = () => {
  const { tokens } = useTheme();
  const { setLogoutModal, setIsAuthenticated, setIsLoaded, authData } =
    useGlobalContext();
  const navigate = useNavigate();

  const handleSignout = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoaded(true);
      await Auth.signOut().then(() => {
        setLogoutModal(false);

        setIsAuthenticated(false);
        navigate("/");
        setIsLoaded(false);
      });
      authData({});
    } catch (error: any) {
      setIsLoaded(false);
    }
  };

  return (
    <ModalWrapper>
      <View
        backgroundColor={"white"}
        width={"100%"}
        maxWidth={{
          xxl: "700px",
          xl: "500px",
          large: "600px",
          medium: "400px",
          base: "300px",
        }}
        marginInline={"auto"}
        padding={{ large: "50px", medium: "50px", base: "30px" }}
        borderRadius={"5px"}
      >
        <View
          className="cancel-icon"
          onClick={() => {
            setLogoutModal(false);
            document.body.style.overflow = "auto";
          }}
        >
          <IoMdClose className="close-button" />
        </View>
        <Text fontSize={"24px"} fontWeight={600} textAlign={"center"}>
          Are you sure you want to log out?
        </Text>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"50px"}
          fontSize={"16px"}
          gap={"24px"}
        >
          <Button
            borderColor={tokens.colors.background.secondary}
            borderRadius={"10px"}
            padding={{ large: "12px 50px", base: "12px 15px" }}
            width={"170px"}
            id="selectBlueHover"
            onClick={handleSignout}
          >
            Log out
          </Button>
          <Button
            borderColor={tokens.colors.background.secondary}
            borderRadius={"10px"}
            padding={{ large: "12px 50px", base: "12px 15px" }}
            width={"170px"}
            id="selectBlueHover"
            onClick={() => {
              setLogoutModal(false);
              document.body.style.overflow = "auto";
            }}
          >
            Cancel
          </Button>
        </Flex>
      </View>
    </ModalWrapper>
  );
};

export default LogoutModel;
