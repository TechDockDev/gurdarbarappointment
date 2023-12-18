import {
  Autocomplete,
  Button,
  CheckboxField,
  Flex,
  Grid,
  Label,
  SelectField,
  Text,
  TextField,
  View,
  useTheme,
} from "@aws-amplify/ui-react";
import { MuiTelInput } from "mui-tel-input";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ScreenWrapper from "../../components/globals/screenWrapper";
import { useState } from "react";

type FormData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  businessName?: string;
  branches?: string;
  country?: string;
};

const BookDemo = () => {
  const { tokens } = useTheme();
  const [formdata, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    branches: "",
    country: "",
  });
  const [errorData, setErrorData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    businessName: "",
    branches: "",
    country: "",
  });

  const checkRequired = () => {
    let errors: FormData = Object.entries(formdata).reduce(
      (accumulator, [key, value]) => {
        return {
          ...accumulator,
          [key]:
            value === ""
              ? `${document
                  .querySelector(`label[for=${key}]`)
                  ?.textContent?.replace(/[*?]/g, "")} is required`
              : "",
        };
      },
      {}
    );
    setErrorData(errors);
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    e.preventDefault();
    checkRequired();
  };

  const handleChangeData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const checkError = (
    e:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLSelectElement, Element>
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setErrorData({
      ...errorData,
      [e.target.name]:
        e.target.value === ""
          ? `${document
              .querySelector(`label[for=${e.target.name}]`)
              ?.textContent?.replace(/[*?]/g, "")} is required`
          : "",
    });
  };

  const removeErrorOnFocus = (
    e:
      | React.FocusEvent<HTMLInputElement, Element>
      | React.FocusEvent<HTMLSelectElement, Element>
      | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setErrorData({
      ...errorData,
      [e.target.name]: "",
    });
  };

  return (
    <div>
      <ScreenWrapper>
        <NavBar />
        <View
          margin={{ base: "3% 10%", medium: "3% 22%" }}
          style={{
            textAlign: "center",
          }}
        >
          <Text
            color={tokens.colors.font.tertiary}
            fontSize={"30px"}
            fontWeight={"bold"}
          >
            See Appointment in Action
          </Text>
          <Text color={"white"} fontSize={"20px"}>
            Get in touch with us to get a customized demo and an introduction to
            all Appointment features and solutions.
          </Text>
        </View>
        <Grid
          templateColumns={{ medium: "1fr 1fr" }}
          margin={"1rem 0.5rem 10rem"}
          className="demo_card_background"
        >
          <View margin={{ base: "15px", small: "30px", large: "50px" }}>
            <ul
              style={{
                color: "#5DDDBE",
                marginTop: "20px",
                justifyContent: "center",
              }}
            >
              <li style={{ marginBottom: "15px" }}>
                <span className="highlightText">
                  Personalized Product Showcase :{" "}
                </span>
                Experience a tailored demonstration of our product, where our
                team will focus on showcasing the features and capabilities that
                align with your specific needs and goals.
              </li>
              <li style={{ marginBottom: "15px" }}>
                <span className="highlightText">Interactive Q&A : </span>Have
                your questions answered in real-time during the demo. Our
                experts will address your inquiries and provide insights to help
                you make an informed decision.
              </li>
              <li style={{ marginBottom: "15px" }}>
                <span className="highlightText">Hands-On Exploration : </span>
                Get a firsthand look at the product's user interface and
                functionality. Interact with the software to understand how it
                can streamline your processes.
              </li>
              <li style={{ marginBottom: "15px" }}>
                <span className="highlightText">Customized Solutions : </span>
                Discover how our product can be customized to address the unique
                challenges and requirements of your business. We'll explore
                potential configurations and integrations.
              </li>
              <li style={{ marginBottom: "15px" }}>
                <span className="highlightText">Time-Efficient : </span>
                Booking a demo is a time-efficient way to gain a comprehensive
                understanding of our product's value. Get a condensed overview
                that focuses on what matters most to you.
              </li>
            </ul>
          </View>
          <View
            className="demo-input-container"
            as="form"
            onSubmit={handleSubmit}
          >
            <Grid templateColumns={{ medium: "1fr 1fr" }} gap={"15px"}>
              <View>
                <Label htmlFor="firstName" fontWeight={"bold"}>
                  First Name<span className="red-asterisk">*</span>
                </Label>
                <TextField
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  variation="quiet"
                  labelHidden
                  hasError={errorData.firstName !== ""}
                  errorMessage={errorData.firstName}
                  onChange={handleChangeData}
                  onFocus={removeErrorOnFocus}
                  onBlur={checkError}
                />
              </View>
              <View>
                <Label htmlFor="lastName" fontWeight={"bold"}>
                  Last Name<span className="red-asterisk">*</span>
                </Label>
                <TextField
                  label="last Name"
                  id="lastName"
                  name="lastName"
                  variation="quiet"
                  labelHidden
                  onChange={handleChangeData}
                  hasError={errorData.lastName !== ""}
                  errorMessage={errorData.lastName}
                  onFocus={removeErrorOnFocus}
                  onBlur={checkError}
                />
              </View>
            </Grid>
            <View>
              <Label htmlFor="email" fontWeight={"bold"}>
                Email<span className="red-asterisk">*</span>
              </Label>
              <TextField
                label="email"
                id="email"
                name="email"
                variation="quiet"
                labelHidden
                onChange={handleChangeData}
                hasError={errorData.email !== ""}
                errorMessage={errorData.email}
                onFocus={removeErrorOnFocus}
                onBlur={checkError}
              />
            </View>
            <View>
              <Label htmlFor="phoneNumber" fontWeight={"bold"}>
                Phone Number<span className="red-asterisk">*</span>
              </Label>
              <MuiTelInput
                variant="standard"
                size="small"
                defaultCountry="ZA"
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                value={formdata.phoneNumber}
                onChange={(value: string) =>
                  setFormData({ ...formdata, phoneNumber: value })
                }
                error={errorData.phoneNumber !== ""}
                helperText={errorData.phoneNumber}
                FormHelperTextProps={{
                  sx: { "&.Mui-error": { color: "rgb(102,0,0)" } },
                }}
                onFocus={removeErrorOnFocus}
                onBlur={checkError}
              />
            </View>
            <View>
              <Label htmlFor="businessName" fontWeight={"bold"}>
                Business Name<span className="red-asterisk">*</span>
              </Label>
              <TextField
                label="businessName"
                id="businessName"
                variation="quiet"
                labelHidden
                name="businessName"
                onChange={handleChangeData}
                hasError={errorData.businessName !== ""}
                errorMessage={errorData.businessName}
                onFocus={removeErrorOnFocus}
                onBlur={checkError}
              />
            </View>
            <View>
              <Label htmlFor="branches" fontWeight={"bold"}>
                How many branches do you have?
                <span className="red-asterisk">*</span>
              </Label>
              <SelectField
                label="How many branches do you have?"
                placeholder="Please Select"
                labelHidden
                name="branches"
                variation="quiet"
                onChange={handleChangeData}
                style={{ backgroundColor: "unset" }}
                hasError={errorData.branches !== ""}
                errorMessage={errorData.branches}
                onFocus={removeErrorOnFocus}
                onBlur={checkError}
              >
                <option value="Not Open Yet">Not Open Yet</option>
                <option value="1 Branch">1 Branch</option>
                <option value="2-4 Branch">2-4 Branch</option>
                <option value="5 or more branches">5 or more branches</option>
              </SelectField>
            </View>
            <View>
              <Label htmlFor="country" fontWeight={"bold"}>
                Country Name<span className="red-asterisk">*</span>
              </Label>
              <Autocomplete
                label="Country"
                id="country"
                options={countriesData}
                placeholder="Please Select"
                hasSearchIcon={false}
                variation="quiet"
                name="country"
                onChange={handleChangeData}
                hasError={errorData.country !== ""}
                errorMessage={errorData.country}
                onFocus={removeErrorOnFocus}
                onBlur={checkError}
              />
            </View>
            <Flex>
              <CheckboxField size="small" label name="Terms" value="no" />
              <Text>
                By checking this box, I confirm that I have read, understood and
                agree to the{" "}
                <Text as="a" className="link-text">
                  Terms and Conditions
                </Text>
                .<span className="red-asterisk">*</span>
              </Text>
            </Flex>
            <Flex>
              <CheckboxField size="small" label name="Terms" value="no" />
              <Text>
                By using this form you agree with the storage and handling of
                your data by this website in accordance with our{" "}
                <Text as="a" className="link-text">
                  Privacy Policy
                </Text>
                <span className="red-asterisk">*</span>
              </Text>
            </Flex>
            <Button className="submit" variation="primary" type="submit">
              Submit
            </Button>
          </View>
        </Grid>
      </ScreenWrapper>
      <Footer />
    </div>
  );
};

export default BookDemo;

const countriesData = [
  { id: "Afghanistan", label: "Afghanistan" },
  { id: "Albania", label: "Albania" },
  { id: "Algeria", label: "Algeria" },
  { id: "Andorra", label: "Andorra" },
  { id: "Angola", label: "Angola" },
  { id: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { id: "Argentina", label: "Argentina" },
  { id: "Armenia", label: "Armenia" },
  { id: "Australia", label: "Australia" },
  { id: "Austria", label: "Austria" },
  { id: "Azerbaijan", label: "Azerbaijan" },
  { id: "Bahamas", label: "Bahamas" },
  { id: "Bahrain", label: "Bahrain" },
  { id: "Bangladesh", label: "Bangladesh" },
  { id: "Barbados", label: "Barbados" },
  { id: "Belarus", label: "Belarus" },
  { id: "Belgium", label: "Belgium" },
  { id: "Belize", label: "Belize" },
  { id: "Benin", label: "Benin" },
  { id: "Bhutan", label: "Bhutan" },
  { id: "Bolivia", label: "Bolivia" },
  { id: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { id: "Botswana", label: "Botswana" },
  { id: "Brazil", label: "Brazil" },
  { id: "Brunei", label: "Brunei" },
  { id: "Bulgaria", label: "Bulgaria" },
  { id: "Burkina Faso", label: "Burkina Faso" },
  { id: "Burundi", label: "Burundi" },
  { id: "Cambodia", label: "Cambodia" },
  { id: "Cameroon", label: "Cameroon" },
  { id: "Canada", label: "Canada" },
  { id: "Cape Verde", label: "Cape Verde" },
  { id: "Central African Republic", label: "Central African Republic" },
  { id: "Chad", label: "Chad" },
  { id: "Chile", label: "Chile" },
  { id: "China", label: "China" },
  { id: "Colombia", label: "Colombia" },
  { id: "Comoros", label: "Comoros" },
  { id: "Congo", label: "Congo" },
  { id: "Costa Rica", label: "Costa Rica" },
  { id: "Croatia", label: "Croatia" },
  { id: "Cuba", label: "Cuba" },
  { id: "Cyprus", label: "Cyprus" },
  { id: "Czech Republic", label: "Czech Republic" },
  { id: "Denmark", label: "Denmark" },
  { id: "Djibouti", label: "Djibouti" },
  { id: "Dominica", label: "Dominica" },
  { id: "Dominican Republic", label: "Dominican Republic" },
  { id: "East Timor", label: "East Timor" },
  { id: "Ecuador", label: "Ecuador" },
  { id: "Egypt", label: "Egypt" },
  { id: "El Salvador", label: "El Salvador" },
  { id: "Equatorial Guinea", label: "Equatorial Guinea" },
  { id: "Eritrea", label: "Eritrea" },
  { id: "Estonia", label: "Estonia" },
  { id: "Ethiopia", label: "Ethiopia" },
  { id: "Fiji", label: "Fiji" },
  { id: "Finland", label: "Finland" },
  { id: "France", label: "France" },
  { id: "Gabon", label: "Gabon" },
  { id: "Gambia", label: "Gambia" },
  { id: "Georgia", label: "Georgia" },
  { id: "Germany", label: "Germany" },
  { id: "Ghana", label: "Ghana" },
  { id: "Greece", label: "Greece" },
  { id: "Grenada", label: "Grenada" },
  { id: "Guatemala", label: "Guatemala" },
  { id: "Guinea", label: "Guinea" },
  { id: "Guinea-Bissau", label: "Guinea-Bissau" },
  { id: "Guyana", label: "Guyana" },
  { id: "Haiti", label: "Haiti" },
  { id: "Honduras", label: "Honduras" },
  { id: "Hungary", label: "Hungary" },
  { id: "Iceland", label: "Iceland" },
  { id: "India", label: "India" },
  { id: "Indonesia", label: "Indonesia" },
  { id: "Iran", label: "Iran" },
  { id: "Iraq", label: "Iraq" },
  { id: "Ireland", label: "Ireland" },
  { id: "Israel", label: "Israel" },
  { id: "Italy", label: "Italy" },
  { id: "Ivory Coast", label: "Ivory Coast" },
  { id: "Jamaica", label: "Jamaica" },
  { id: "Japan", label: "Japan" },
  { id: "Jordan", label: "Jordan" },
  { id: "Kazakhstan", label: "Kazakhstan" },
  { id: "Kenya", label: "Kenya" },
  { id: "Kiribati", label: "Kiribati" },
  { id: "Kuwait", label: "Kuwait" },
  { id: "Kyrgyzstan", label: "Kyrgyzstan" },
  { id: "Laos", label: "Laos" },
  { id: "Latvia", label: "Latvia" },
  { id: "Lebanon", label: "Lebanon" },
  { id: "Lesotho", label: "Lesotho" },
  { id: "Liberia", label: "Liberia" },
  { id: "Libya", label: "Libya" },
  { id: "Liechtenstein", label: "Liechtenstein" },
  { id: "Lithuania", label: "Lithuania" },
  { id: "Luxembourg", label: "Luxembourg" },
  { id: "Macedonia", label: "Macedonia" },
  { id: "Madagascar", label: "Madagascar" },
  { id: "Malawi", label: "Malawi" },
  { id: "Malaysia", label: "Malaysia" },
  { id: "Maldives", label: "Maldives" },
  { id: "Mali", label: "Mali" },
  { id: "Malta", label: "Malta" },
  { id: "Marshall Islands", label: "Marshall Islands" },
  { id: "Mauritania", label: "Mauritania" },
  { id: "Mauritius", label: "Mauritius" },
  { id: "Mexico", label: "Mexico" },
  { id: "Micronesia", label: "Micronesia" },
  { id: "Moldova", label: "Moldova" },
  { id: "Monaco", label: "Monaco" },
  { id: "Mongolia", label: "Mongolia" },
  { id: "Montenegro", label: "Montenegro" },
  { id: "Morocco", label: "Morocco" },
  { id: "Mozambique", label: "Mozambique" },
  { id: "Myanmar", label: "Myanmar" },
  { id: "Namibia", label: "Namibia" },
  { id: "Nauru", label: "Nauru" },
  { id: "Nepal", label: "Nepal" },
  { id: "Netherlands", label: "Netherlands" },
  { id: "New Zealand", label: "New Zealand" },
  { id: "Nicaragua", label: "Nicaragua" },
  { id: "Niger", label: "Niger" },
  { id: "Nigeria", label: "Nigeria" },
  { id: "North Korea", label: "North Korea" },
  { id: "Norway", label: "Norway" },
  { id: "Oman", label: "Oman" },
  { id: "Pakistan", label: "Pakistan" },
  { id: "Palau", label: "Palau" },
  { id: "Palestine", label: "Palestine" },
  { id: "Panama", label: "Panama" },
  { id: "Papua New Guinea", label: "Papua New Guinea" },
  { id: "Paraguay", label: "Paraguay" },
  { id: "Peru", label: "Peru" },
  { id: "Philippines", label: "Philippines" },
  { id: "Poland", label: "Poland" },
  { id: "Portugal", label: "Portugal" },
  { id: "Qatar", label: "Qatar" },
  { id: "Romania", label: "Romania" },
  { id: "Russia", label: "Russia" },
  { id: "Rwanda", label: "Rwanda" },
  { id: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
  { id: "Saint Lucia", label: "Saint Lucia" },
  {
    id: "Saint Vincent and the Grenadines",
    label: "Saint Vincent and the Grenadines",
  },
  { id: "Samoa", label: "Samoa" },
  { id: "San Marino", label: "San Marino" },
  { id: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { id: "Saudi Arabia", label: "Saudi Arabia" },
  { id: "Senegal", label: "Senegal" },
  { id: "Serbia", label: "Serbia" },
  { id: "Seychelles", label: "Seychelles" },
  { id: "Sierra Leone", label: "Sierra Leone" },
  { id: "Singapore", label: "Singapore" },
  { id: "Slovakia", label: "Slovakia" },
  { id: "Slovenia", label: "Slovenia" },
  { id: "Solomon Islands", label: "Solomon Islands" },
  { id: "Somalia", label: "Somalia" },
  { id: "South Africa", label: "South Africa" },
  { id: "South Korea", label: "South Korea" },
  { id: "South Sudan", label: "South Sudan" },
  { id: "Spain", label: "Spain" },
  { id: "Sri Lanka", label: "Sri Lanka" },
  { id: "Sudan", label: "Sudan" },
  { id: "Suriname", label: "Suriname" },
  { id: "Swaziland", label: "Swaziland" },
  { id: "Sweden", label: "Sweden" },
  { id: "Switzerland", label: "Switzerland" },
  { id: "Syria", label: "Syria" },
  { id: "Tajikistan", label: "Tajikistan" },
  { id: "Tanzania", label: "Tanzania" },
  { id: "Thailand", label: "Thailand" },
  { id: "Togo", label: "Togo" },
  { id: "Tonga", label: "Tonga" },
  { id: "Trinidad and Tobago", label: "Trinidad and Tobago" },
  { id: "Tunisia", label: "Tunisia" },
  { id: "Turkey", label: "Turkey" },
  { id: "Turkmenistan", label: "Turkmenistan" },
  { id: "Tuvalu", label: "Tuvalu" },
  { id: "Uganda", label: "Uganda" },
  { id: "Ukraine", label: "Ukraine" },
  { id: "United Arab Emirates", label: "United Arab Emirates" },
  { id: "United Kingdom", label: "United Kingdom" },
  { id: "United States", label: "United States" },
  { id: "Uruguay", label: "Uruguay" },
  { id: "Uzbekistan", label: "Uzbekistan" },
  { id: "Vanuatu", label: "Vanuatu" },
  { id: "Vatican City", label: "Vatican City" },
  { id: "Venezuela", label: "Venezuela" },
  { id: "Vietnam", label: "Vietnam" },
  { id: "Yemen", label: "Yemen" },
  { id: "Zambia", label: "Zambia" },
  { id: "Zimbabwe", label: "Zimbabwe" },
];
