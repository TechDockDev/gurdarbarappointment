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
  Input,
  Label,
  Loader,
} from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import { StorageImage } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";
import "../../../assets/styles.css";
import { useGlobalContext } from "../../../context/GlobalContext";
import { FaEdit } from "react-icons/fa";
import { MuiTelInput } from "mui-tel-input";
import { getProfileData } from "../../../services/apiService";
import {
  updateProfileData,
  uploadProfileImage,
} from "../../../services/apiService";

type profileDataProps = {
  email: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  address: string;
  profileAvatar: string;
};

const redAsterisk = <span className="red-asterisk">*</span>;
const Profile = () => {
  const { tokens } = useTheme();
  const { authData, profileImageLoad, setProfileImageLoad } =
    useGlobalContext();
  const [formdata, setFormdata] = useState<profileDataProps>({
    email: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    address: "",
    profileAvatar: "",
  });
  const [phone, setPhone] = useState<any>("");
  const [showSuccess, setShowSuccess] = useState({ open: false });
  const [isHovered, setIsHovered] = useState(false);

  const handleProfiledata = (e: any) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleChange = (newPhone: any) => {
    setPhone(newPhone);
  };

  const handleSubmit = async () => {
    try {
      await updateProfileData({
        first_name: formdata.firstName,
        last_name: formdata.lastName,
        phone,
        address: formdata.address,
      });
      setShowSuccess({ open: true });
      setTimeout(() => {
        setShowSuccess({ open: false });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const profileData = await getProfileData();
      setFormdata({
        ...formdata,
        firstName: profileData.first_name ?? "",
        lastName: profileData.last_name ?? "",
        profileAvatar: profileData.profile_avatar ?? "",
        address: profileData.address ?? "",
      });
      setPhone(profileData.phone ? profileData.phone : "");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formdata);

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
                alt="Profile"
                className="card_background_color profile-image"
                imgKey={authData.email}
                accessLevel="protected"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            ) : (
              <Image
                className="card_background_color profile-image"
                src="/profile-default.png"
                alt="Profile"
                opacity={isHovered ? "0.3" : "1"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
            )}
            <View
              className="profile_edit"
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
        <Grid templateColumns={"1fr 1fr"} gap={"20px"}>
          <View>
            <Text>First Name{redAsterisk}</Text>
            <TextField
              label={`First Name`}
              name="firstName"
              isRequired={true}
              placeholder="Enter your name"
              autoComplete="name"
              width={"100%"}
              variation="quiet"
              labelHidden
              value={formdata.firstName}
              onChange={handleProfiledata}
            />
          </View>
          <View>
            <Text>Last Name</Text>
            <TextField
              label="Last Name"
              name="lastName"
              isRequired={true}
              placeholder="Enter your name"
              autoComplete="name"
              width={"100%"}
              variation="quiet"
              labelHidden
              value={formdata.lastName}
              onChange={handleProfiledata}
            />
          </View>
        </Grid>
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
            labelHidden
            variation="quiet"
            value={authData.email ? authData.email : ""}
          />
        </View>
        <View>
          <Text>Address{redAsterisk}</Text>
          <SelectField
            label="Address"
            name="address"
            placeholder="--Select Address--"
            labelHidden
            value={formdata.address}
            onChange={handleProfiledata}
          >
            <option value="Cape Town">Cape Town</option>
            <option value="London">London</option>
            <option value="New York">New York</option>
            <option value="Brussels">Brussels</option>
            <option value="Tokyo">Tokyo</option>
          </SelectField>
        </View>
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

export default Profile;
