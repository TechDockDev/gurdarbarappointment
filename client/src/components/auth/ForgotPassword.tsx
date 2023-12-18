import {
  View,
  Flex,
  Button,
  Text,
  Heading,
  TextField,
  PasswordField,
} from "@aws-amplify/ui-react";
import { useGlobalContext } from "../../context/GlobalContext";
import Authentication from "../globals/Authentication";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useState } from "react";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";

type passwordType = {
  email: string;
  code: string;
  newPassword: string;
};

let validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .trim()
    .required()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "must be a valid email"
    ),
  newPassword: yup
    .string()
    .trim()
    .min(8)
    .required()
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "Must Contain  One Special Case Character"
    ),
});

const ForgotPassword = () => {
  const [passwordData, setPasswordData] = useState<passwordType>({
    email: "",
    code: "",
    newPassword: "",
  });
  const [errData, setErrData] = useState<{
    email?: string;
    newPassword?: string;
  }>({
    email: "",
    newPassword: "",
  });
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const { setIsLoaded, setIsAuthenticated } = useGlobalContext();
  const handleChangeAuthData = (e: any) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  // const [isValidate, setIsValidate] = useState<boolean>(false);
  const handleSendCode = async () => {
    try {
      setIsLoaded(true);
      const { email } = passwordData;

      await Auth.forgotPassword(email);
      setShowForm(true);
      setIsLoaded(false);
    } catch (err: any) {
      setSubmitError(err.message);
      setIsLoaded(false);
    }
  };

  const handleClose = () => {
    document.body.style.overflow = "auto";
    navigate("/");
  };

  const handleChangeErrData = (e: any, message: string) => {
    setErrData({ ...errData, [e.target.name]: [message] });
  };

  const handleSubmit = async () => {
    try {
      setIsLoaded(true);
      const { email, code, newPassword } = passwordData;

      await Auth.forgotPasswordSubmit(email, code, newPassword);

      navigate("/login");
      setIsLoaded(false);

      setIsAuthenticated(true);
    } catch (err: any) {
      setSubmitError(err.message);
      setIsLoaded(false);
    }
  };

  return (
    <Authentication>
      <View as="div" className="cancel-icon" onClick={handleClose}>
        <IoMdClose className="close-button" />
      </View>
      <View className="center">
        <Flex as="form" direction={"column"}>
          <Heading textAlign={"center"} fontSize={"42px"}>
            Change your Password
          </Heading>
          {!showForm ? (
            <>
              <TextField
                label="Email"
                name="email"
                placeholder="Enter Email"
                isRequired={true}
                variation="quiet"
                descriptiveText={
                  <Text
                    as="span"
                    color="red.60"
                    fontStyle="italic"
                    fontSize="0.8rem"
                  >
                    {errData.email}
                  </Text>
                }
                onKeyDown={(e) => {
                  validationSchema
                    .validateAt("email", passwordData)
                    .then(() => handleChangeErrData(e, ""))
                    .catch((err) => handleChangeErrData(e, err.message));
                }}
                onKeyUp={(e) => {
                  validationSchema
                    .validateAt("email", passwordData)
                    .then(() => handleChangeErrData(e, ""))
                    .catch((err) => handleChangeErrData(e, err.message));
                }}
                value={passwordData.email}
                onChange={handleChangeAuthData}
              />
              <Text as="span" color="red.60" fontSize="1rem" padding={"5px"}>
                {submitError}
              </Text>
              <Button variation="primary" onClick={handleSendCode}>
                SEND CODE
              </Button>
            </>
          ) : (
            <>
              <TextField
                label="Code"
                name="code"
                placeholder="Enter Code"
                isRequired={true}
                size="small"
                variation="quiet"
                value={passwordData.code}
                onChange={handleChangeAuthData}
              />

              <PasswordField
                label="New Password"
                name="newPassword"
                placeholder="New Password"
                isRequired={true}
                variation="quiet"
                descriptiveText={
                  <Text
                    as="span"
                    color="red.60"
                    fontStyle="italic"
                    fontSize="0.8rem"
                  >
                    {errData.newPassword}
                  </Text>
                }
                onKeyDown={(e) => {
                  validationSchema
                    .validateAt("newPassword", passwordData)
                    .then(() => handleChangeErrData(e, ""))
                    .catch((err) => handleChangeErrData(e, err.message));
                }}
                value={passwordData.newPassword}
                onChange={handleChangeAuthData}
              />
              <Text as="span" color="red.60" fontSize="1rem" padding={"5px"}>
                {submitError}
              </Text>
              <Button variation="primary" onClick={handleSubmit}>
                Change Password
              </Button>
            </>
          )}
        </Flex>
      </View>
    </Authentication>
  );
};

export default ForgotPassword;
