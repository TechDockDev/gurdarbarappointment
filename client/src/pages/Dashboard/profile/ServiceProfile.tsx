import { useEffect, useState } from "react";
import {
  View,
  Heading,
  Grid,
  TextField,
  Button,
  Image,
  SelectField,
  Text,
  Label,
  Loader,
  Input,
} from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import { useGlobalContext } from "../../../context/GlobalContext";
import { editServiceProvider } from "../../../services/apiService";
import { getCurrentUser } from "../../../services/apiService";
import { uploadProfileImage } from "../../../services/apiService";
import { FaEdit } from "react-icons/fa";
import { MuiTelInput } from "mui-tel-input";

type profileDataProps = {
  email: string;
  name: string;
  // designation: string;
  profileAvatar: string;
  address: string;
};

const redAsterisk = <span className="red-asterisk">*</span>;
const ServiceProfile = () => {
  const { tokens } = useTheme();
  const { authData, profileImageLoad, setProfileImageLoad } =
    useGlobalContext();
  const [formdata, setFormdata] = useState<profileDataProps>({
    email: "",
    name: "",
    // designation: "doctor",
    profileAvatar: "",
    address: "",
  });
  const [phone, setPhone] = useState<any>("");
  const [isHovered, setIsHovered] = useState(false);
  const [showSuccess, setShowSuccess] = useState({ open: false });
  const handleChange = (newPhone: any) => {
    setPhone(newPhone);
  };

  const handleProfiledata = (e: any) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  async function onChange(
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    setProfileImageLoad(true);
    const file = e.target.files ? e.target.files[0] : null;
    try {
      await uploadProfileImage(authData.email, file);
      setProfileImageLoad(false);
    } catch (error) {
      setProfileImageLoad(false);
      console.log("Error uploading file: ", error);
    }
  }

  const handleSubmit = async () => {
    try {
      await editServiceProvider(formdata); // Use the API function
      setShowSuccess({ open: true });
      setTimeout(() => {
        setShowSuccess({ open: false });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await getCurrentUser();
      setFormdata({
        name: res.provider.account_manager_name || "",
        email: res.provider.account_manager_email || "",
        profileAvatar: res.provider.profile_avatar || "",
        address: res.provider.account_manager_address || "",
        // designation: res.provider.service_provider_type.sp_type || "",
      });
      setPhone(res.provider.sp_phone || "");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      as="form"
      className="container"
      color={tokens.colors.font.primary}
      maxWidth={{ xl: "1165px", large: "900px" }}
    >
      <Heading className="main-heading">My Profile</Heading>
      <Grid className="profile-container">
        <View position={"relative"} width={"fit-content"}>
          <Label htmlFor="profile_pic">
            {formdata?.profileAvatar && !profileImageLoad ? (
              <StorageImage
                alt="profile"
                className="card_background_color profile-image"
                imgKey={authData.email}
                accessLevel="protected"
                opacity={isHovered ? "0.3" : "1"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <Image
                className="card_background_color  profile-image"
                src="/profile-default.png"
                alt="Profile"
                opacity={isHovered ? "0.3" : "1"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            )}
            <View
              className="profile_edit"
              transform={"translate(-50%, -50%)"}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {profileImageLoad ? (
                <Loader
                  size="large"
                  width={"50px"}
                  filledColor={tokens.colors.font.primary}
                />
              ) : (
                isHovered && <FaEdit size={22} />
              )}
              <Input
                name="profile_pic"
                id="profile_pic"
                type="file"
                display={"none"}
                onChange={onChange}
              />
            </View>
          </Label>
        </View>
        <View>
          <Text>Name{redAsterisk}</Text>
          <TextField
            label="Name*"
            name="name"
            isRequired={true}
            placeholder="Enter your name"
            autoComplete="name"
            width={"100%"}
            variation="quiet"
            labelHidden
            value={formdata.name}
            onChange={handleProfiledata}
          />
        </View>
        <View>
          <Text>Email{redAsterisk}</Text>
          <TextField
            label="Email*"
            name="Email"
            isRequired={true}
            placeholder="Enter your Email"
            autoComplete="Email"
            width={"100%"}
            isDisabled={true}
            variation="quiet"
            labelHidden
            value={authData.email ? authData.email : ""}
          />
        </View>
        {/* <View>
          <Text>Designation{redAsterisk}</Text>
          <TextField
            label="Designation*"
            name="Designation"
            isRequired={true}
            isDisabled={true}
            placeholder="Enter your Designation"
            autoComplete="Designation"
            width={"100%"}
            variation="quiet"
            labelHidden
            value={formdata.designation}
          />
        </View> */}
        <SelectField
          label="Address"
          name="address"
          placeholder="--Select Address--"
          value={formdata.address}
          onChange={handleProfiledata}
        >
          <option value="Cape Town">Cape Town</option>
          <option value="London">London</option>
          <option value="New York">New York</option>
          <option value="Brussels">Brussels</option>
          <option value="Tokyo">Tokyo</option>
        </SelectField>
        <View>
          <Text>Contact Number</Text>
          <MuiTelInput
            variant="outlined"
            size="small"
            defaultCountry="ZA"
            fullWidth
            value={phone}
            onChange={handleChange}
            sx={{
              outline: "none",
              backgroundColor: "#EFF0F0",
              "& .Mui-focused fieldset": {
                border: `1px solid #5DDDBE !important`,
              },
            }}
          />
        </View>
        <View>
          <Text
            color={tokens.colors.font.tertiary}
            fontSize={"16px"}
            style={{
              visibility: showSuccess.open ? "visible" : "hidden",
              marginBottom: "5px",
            }}
          >
            Profile Saved Successfully
          </Text>
          <Button variation="primary" onClick={handleSubmit} width={"50%"}>
            Save
          </Button>
        </View>
      </Grid>
    </View>
  );
};

export default ServiceProfile;
