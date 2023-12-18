import {
  View,
  Flex,
  Button,
  Text,
  Heading,
  TextField,
} from "@aws-amplify/ui-react";
import { useGlobalContext } from "../../context/GlobalContext";
import Authentication from "../globals/Authentication";
import { useNavigate, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

type confirmDataType = {
  code: string;
};

const ConfirmSignUp = () => {
  const [confirmData, setConfirmData] = useState<confirmDataType>({
    code: "",
  });
  const [submitError, setSubmitError] = useState<string>("");
  const { setIsAuthenticated, setIsLoaded } = useGlobalContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { role } = state;
  const handleChangeAuthData = (e: any) => {
    setConfirmData({ ...confirmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoaded(true);
      const { code } = confirmData;
      await Auth.confirmSignUp(state.email, code);
      await Auth.signIn(state.email, state.password);
      setIsAuthenticated(true);
      navigate(
        `/dashboard/${role === "Customer" ? "user" : "serviceProvider"}`
      );
      setIsLoaded(false);
      document.body.style.overflow = "auto";
    } catch (err: any) {
      setSubmitError(err.message);
      setIsLoaded(false);
    }
  };

  const handleClose = async () => {
    document.body.style.overflow = "auto";
    navigate("/");
  };

  return (
    <Authentication>
      <View as="div" className="cancel-icon" onClick={handleClose}>
        <IoMdClose className="close-button" />
      </View>
      <Flex className="center">
        <Flex as="form" direction={"column"}>
          <Heading textAlign={"center"} fontSize={"42px"}>
            Confirm Your SignUp
          </Heading>
          <Text as="p" className="enter-otp-text">
            Please Enter your code
          </Text>
          {/* password */}
          <TextField
            label="Code"
            name="code"
            placeholder="Enter Code"
            isRequired={true}
            size="small"
            variation="quiet"
            value={confirmData.code}
            onChange={handleChangeAuthData}
          />

          <Text as="span" color="red.60" fontSize="1rem" padding={"5px"}>
            {submitError}
          </Text>
          <Button variation="primary" onClick={handleSubmit}>
            Confirm Code
          </Button>
        </Flex>
      </Flex>
    </Authentication>
  );
};

export default ConfirmSignUp;
