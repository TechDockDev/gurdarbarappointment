import { useState } from "react";
import {
  Flex,
  PasswordField,
  Button,
  Text,
  View,
  CheckboxField,
  useTheme,
  Heading,
  TextField,
} from "@aws-amplify/ui-react";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import Authentication from "../globals/Authentication";
import { useGlobalContext } from "../../context/GlobalContext";
import { IoMdClose } from "react-icons/io";

type authDataProps = {
  email: string;
  password: string;
};

let validationSchema = yup.object({
  email: yup
    .string()
    .email()
    .trim()
    .required()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email must be valid"
    ),
  password: yup.string().trim().required(),
});

const Login = () => {
  const [formdata, setFormdata] = useState<authDataProps>({
    email: "",
    password: "",
  });
  const [submitError, setSubmitError] = useState<String>("");
  const [hasError, setHasError] = useState({ email: false, password: false });

  const { setLogInModal, setIsAuthenticated, setIsLoaded } = useGlobalContext();
  const { tokens } = useTheme();
  const navigate = useNavigate();

  const handleLogindata = (e: any) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const val = await validationSchema.isValid(formdata);
      if (!val) {
        validationSchema.validateAt("email", formdata).catch(() => {
          if (formdata.password === "") {
            setHasError({ email: true, password: true });
            return;
          }
          setHasError({ email: true, password: false });
        });
        return;
      }
      const { email, password } = formdata;
      setIsLoaded(true);
      const response = await Auth.signIn(email, password);
      document.body.style.overflow = "hidden";
      setIsAuthenticated(true);
      navigate(
        `/dashboard/${
          response.attributes["custom:role"] === "Sangat"
            ? "user"
            : "serviceProvider"
        }`
      );
      setIsLoaded(false);
      document.body.style.overflow = "auto";
    } catch (e: any) {
      setSubmitError(e.message);
      setIsLoaded(false);
    }
  };

  return (
    <Authentication>
      <Flex as="form" direction={"column"} width={"100%"}>
        <View
          className="cancel-icon"
          onClick={() => {
            document.body.style.overflow = "auto";
            navigate("/");
          }}
        >
          <IoMdClose className="close-button" />
        </View>
        <Heading textAlign={"center"} fontSize={"42px"} fontWeight={700}>
          Welcome Back
        </Heading>
        <Text as="p" textAlign={"center"} fontSize={"18px"}>
          Please log in to continue
        </Text>
        {/* username */}
        <TextField
          label="Email"
          name="email"
          autoComplete="email"
          placeholder="Enter Email Address"
          marginTop={"24px"}
          variation="quiet"
          hasError={hasError.email}
          errorMessage={"Email must be valid"}
          onBlur={() => {
            validationSchema
              .validateAt("email", formdata)
              .then(() => setHasError({ ...hasError, email: false }))
              .catch(() => setHasError({ ...hasError, email: true }));
          }}
          onFocus={() => setHasError({ ...hasError, email: false })}
          value={formdata.email}
          onChange={handleLogindata}
        />
        {/* password */}
        <PasswordField
          label="Password"
          name="password"
          placeholder="Enter password"
          isRequired={true}
          variation="quiet"
          value={formdata.password}
          errorMessage={"Password is required"}
          hasError={hasError.password}
          onBlur={() => {
            validationSchema
              .validateAt("password", formdata)
              .then(() => setHasError({ ...hasError, password: false }))
              .catch(() => setHasError({ ...hasError, password: true }));
          }}
          onFocus={() => setHasError({ ...hasError, password: false })}
          onChange={handleLogindata}
        />
        <Flex direction={"row"} justifyContent={"space-between"}>
          <CheckboxField
            size="small"
            label="Remember Me"
            name="Remember Me"
            value="no"
          />
          <Text
            fontSize={tokens.fontSizes.small}
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/forgotpassword")}
          >
            Forgot Password?
          </Text>
        </Flex>
        <Text as="span" color="red.60" fontSize="1rem" padding={"5px"}>
          {submitError}
        </Text>
        <Button variation="primary" onClick={handleSubmit}>
          Login
        </Button>
      </Flex>
      <View as="div" border={"1px #DDE1E6 solid"} marginTop={"24px"}></View>
      <Text
        as="div"
        className="no-account-text"
        onClick={() => {
          setLogInModal(false);
        }}
      >
        <Link to="/signup" className="signupLink">
          No account yet? Sign Up
        </Link>
      </Text>
    </Authentication>
  );
};

export default Login;
