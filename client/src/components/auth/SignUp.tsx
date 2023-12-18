import {
  Flex,
  PasswordField,
  Button,
  Text,
  View,
  RadioGroupField,
  Radio,
  SelectField,
  CheckboxField,
  Heading,
  TextField,
  Grid,
} from "@aws-amplify/ui-react";
import * as yup from "yup";
import { useGlobalContext } from "../../context/GlobalContext";
import { getServiceProviderTypes } from "../../services/apiService";
import Authentication from "../globals/Authentication";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

type authDataType = {
  email: string;
  password: string;
  gurudwara_sahib?: null | number;
  role: string;
  Name: string;
};

let validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("invalid email")
    .required("email is required")
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please enter the right format"
    ),
  password: yup
    .string()
    .trim()
    .required()
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Number Character")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must Contain  One Special Case Character")
    .min(8),
  role: yup.string().required(),
  Name: yup.string().required("Name is required"),
  gurudwara_sahib: yup.string().required("Gurudwara Sahib is required"),
});

const SignUp = () => {
  const [authData, setAuthData] = useState<authDataType>({
    email: "",
    password: "",
    role: "Sangat",
    gurudwara_sahib: null,
    Name: "",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitError, setSubmitError] = useState<String>("");
  const [services, setServices] = useState<[]>([]);
  const [isValidate, setIsValidate] = useState<boolean>(false);
  const [errData, setErrData] = useState<{
    Name?: string;
    email?: string;
    password?: string;
    gurudwara_sahib?: string;
  }>({
    Name: "",
    email: "",
    password: "",
    gurudwara_sahib: "",
  });

  const { setIsLoaded } = useGlobalContext();
  const navigate = useNavigate();

  const handleChangeAuthData = (e: any) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleChangeErrData = (e: any, message: string) => {
    setErrData({ ...errData, [e.target.name]: message });
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getServiceProviderTypes();
        setServices(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoaded(true);
      if (authData.role === "Sangat") {
        authData.gurudwara_sahib = undefined;
      }
      await validationSchema.isValid(authData);
      const { email, password, Name, role, gurudwara_sahib }: authDataType =
        authData;

      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          name: Name,
          "custom:role": role,
          "custom:gurudwara_sahib": gurudwara_sahib,
          // "custom:profession": profession,
        },
      });
      setIsLoaded(false);
      document.body.style.overflow = "hidden";
      navigate("/confirm", { state: { role, email, password } });
    } catch (e: any) {
      setSubmitError(e.message);
      setIsLoaded(false);
    }
  };

  const redAsterisk = <span className="red-asterisk">*</span>;

  useEffect(() => {
    if (authData.role === "Sangat") {
      authData.Name = firstName ? `${firstName} ${lastName}` : "";
      authData.gurudwara_sahib = -1;
    } else if (
      authData.role === "Gurudwara Sahib" &&
      authData.gurudwara_sahib === -1
    ) {
      authData.gurudwara_sahib = null;
      authData.Name = "";
    }
    validationSchema.isValid(authData).then((val) => setIsValidate(val));
  }, [authData]);

  const getFirstErrorsForAllKeys = async (data: any) => {
    const errors: any = {};

    for (const key in data) {
      try {
        await validationSchema.validateAt(key, data);
      } catch (error: any) {
        errors[key] = error.message;
      }
    }

    return errors;
  };

  useEffect(() => {
    setErrData({
      Name: "",
      email: "",
      password: "",
      gurudwara_sahib: "",
    });
  }, [authData.role]);
  return (
    <Authentication>
      <Flex
        as="form"
        className="signup-container"
        onSubmit={async (e) => {
          e.preventDefault();
          if (isValidate) {
            handleSubmit();
          } else {
            const errors = await getFirstErrorsForAllKeys(authData);
            setErrData(errors);
          }
        }}
      >
        <Flex className="center">
          <Heading level={2} className="signup-heading">
            Sign Up Free
          </Heading>

          <View
            className="cancel-icon"
            onClick={() => {
              navigate("/");
              document.body.style.overflow = "auto";
            }}
          >
            <IoMdClose className="close-button" />
          </View>
        </Flex>
        <Text className="signup-sub-heading">
          Get access to advance appointment booking system
        </Text>
        <Flex className="center radio-button-container">
          <RadioGroupField
            label=""
            name="role"
            direction={"row"}
            defaultValue={"Sangat"}
            onChange={handleChangeAuthData}
          >
            <Flex className="center radio-box-signup-subcontainer">
              <Radio value="Sangat">
                <Text className="signup-selection-heading">Sangat</Text>
              </Radio>
            </Flex>
            <Flex className="center radio-box-signup-subcontainer">
              <Radio value="Gurudwara Sahib">
                <Text className="signup-selection-heading">Gurudwar Sahib</Text>
              </Radio>
            </Flex>
          </RadioGroupField>
        </Flex>
        {authData.role === "Sangat" ? (
          <Grid templateColumns={{ medium: "1fr 1fr" }} gap={"10px"}>
            <View>
              <Text marginBottom={"10px"}>First Name{redAsterisk}</Text>
              <TextField
                label="First name"
                name="Name"
                placeholder="Enter your First Name"
                autoComplete="FirstName"
                width={"100%"}
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
                variation="quiet"
                labelHidden
                errorMessage={errData.Name}
                hasError={firstName === "" && errData.Name !== ""}
                onBlur={(e) => {
                  validationSchema
                    .validateAt("Name", authData)
                    .then(() => {
                      handleChangeErrData(e, "");
                    })
                    .catch((err) => {
                      handleChangeErrData(e, err.message);
                    });
                }}
                onFocus={(e) => {
                  handleChangeErrData(e, "");
                }}
              />
            </View>
            <View>
              <Text marginBottom={"10px"}>Last Name</Text>
              <TextField
                label="Last name"
                name="LastName"
                placeholder="Enter your Last Name"
                autoComplete="LastName"
                width={"100%"}
                value={lastName}
                onChange={(e: any) => setLastName(e.target.value)}
                variation="quiet"
                labelHidden
              />
            </View>
          </Grid>
        ) : (
          <>
            <Text>Name{redAsterisk}</Text>
            <TextField
              label="Name"
              name="Name"
              placeholder="Enter your name"
              autoComplete="Name"
              width={"100%"}
              onChange={handleChangeAuthData}
              variation="quiet"
              labelHidden
              hasError={errData.Name !== ""}
              errorMessage={errData.Name}
              onBlur={(e) => {
                validationSchema
                  .validateAt("Name", authData)
                  .then(() => handleChangeErrData(e, ""))
                  .catch((err) => handleChangeErrData(e, err.message));
              }}
              onFocus={(e) => {
                handleChangeErrData(e, "");
              }}
            />
          </>
        )}
        {/* email */}
        {authData?.role === "Gurudwara Sahib" && (
          <>
            <Text>Gurudwara Sahib{redAsterisk}</Text>
            <SelectField
              label="gurudwara_sahib"
              name="gurudwara_sahib"
              placeholder="Select Gurudwara Sahib"
              onChange={handleChangeAuthData}
              labelHidden
              errorMessage={errData.gurudwara_sahib}
              hasError={errData.gurudwara_sahib !== ""}
              onBlur={(e) => {
                validationSchema
                  .validateAt("gurudwara_sahib", authData)
                  .then(() => handleChangeErrData(e, ""))
                  .catch((err) => handleChangeErrData(e, err.message));
              }}
              onFocus={(e) => {
                handleChangeErrData(e, "");
              }}
            >
              {services.map((val: any, idx) => {
                return (
                  <option value={val?.gurudwara_id} key={idx}>
                    {val?.gurudwara_name.charAt(0).toUpperCase() +
                      val?.gurudwara_name?.slice(1)}
                  </option>
                );
              })}
            </SelectField>
          </>
        )}

        <Text>Email{redAsterisk}</Text>
        <TextField
          label={"Email"}
          name="email"
          placeholder="Enter Email Address"
          autoComplete="email"
          errorMessage={errData.email}
          hasError={errData.email !== ""}
          labelHidden
          onBlur={(e) => {
            validationSchema
              .validateAt("email", authData)
              .then(() => handleChangeErrData(e, ""))
              .catch((err) => handleChangeErrData(e, err.message));
          }}
          onFocus={(e) => {
            handleChangeErrData(e, "");
          }}
          onChange={handleChangeAuthData}
          variation="quiet"
        />
        <Text>Password{redAsterisk}</Text>
        <PasswordField
          label="Password"
          name="password"
          onChange={handleChangeAuthData}
          placeholder="Enter Password"
          labelHidden
          errorMessage={errData.password}
          hasError={errData.password !== ""}
          onBlur={(e) => {
            validationSchema
              .validateAt("password", authData)
              .then(() => handleChangeErrData(e, ""))
              .catch((err) => {
                handleChangeErrData(e, err.message);
              });
          }}
          onFocus={(e) => {
            handleChangeErrData(e, "");
          }}
          onSubmit={(e) => {
            console.log(e);
            validationSchema
              .validateAt("password", authData)
              .then(() => handleChangeErrData(e, ""))
              .catch((err) => {
                handleChangeErrData(e, err.message);
                console.log(err);
              });
          }}
          variation="quiet"
        />
        <Flex className="terms-and-condition-header">
          <CheckboxField
            size="small"
            label
            name="Terms"
            onChange={handleChangeAuthData}
            value="no"
          />
          <Text color="#1C469A" fontSize={"14px"} fontWeight={400}>
            On clicking this, I accept the{" "}
            <Text as="span" className="terms-and-condition-text">
              terms and condition
            </Text>{" "}
            of this website
          </Text>
        </Flex>
        <Text as="span" color="red.60" fontSize="1rem" padding={"5px"}>
          {submitError}
        </Text>
        <Button variation="primary" type="submit">
          Sign Up
        </Button>
      </Flex>
    </Authentication>
  );
};

export default SignUp;
