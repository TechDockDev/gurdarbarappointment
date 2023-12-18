import { useState, useEffect } from "react";
import AppWrapper from "../../../components/globals/AppWrapper";

import {
  Menu,
  View,
  Flex,
  Heading,
  Divider,
  Image,
  Text,
  MenuItem,
} from "@aws-amplify/ui-react";
import { BsPersonFill } from "react-icons/bs";
import SideBar from "../sideBar/SideBar";
import { useTheme } from "@aws-amplify/ui-react";
import { Outlet } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Calendar from "../../../components/booking/Calendar";
import { useGlobalContext } from "../../../context/GlobalContext";
import CancelDetails from "../../../components/booking/CancelDetails";
import Cancel from "../../../components/booking/Cancel";
import LogoutModel from "../../../components/auth/LogoutModel";
import Success from "../../../components/booking/Success";
import { fetchUserProfile } from "../../../services/apiService";
import Loader from "../../../components/globals/Loader";
import ProviderSideBar from "../sideBar/ProviderSidebar";
import OutletWrapper from "../../../components/globals/OutletWrapper";
import { useNavigate } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { StorageImage } from "@aws-amplify/ui-react-storage";
const Dashboard = () => {
  const { tokens } = useTheme();
  const { authData, profileImageLoad } = useGlobalContext();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState<Boolean | any>(false);
  const [profile, setProfile] = useState<any>({});
  const {
    calendarModal,
    cancelDetailModal,
    cancelModal,
    logoutModal,
    setLogoutModal,
    successModal,
  } = useGlobalContext();

  useEffect(() => {
    (async () => {
      const path =
        authData["custom:role"] === "Sangat"
          ? "/customer/current"
          : "/service-provider/current";

      const response = await fetchUserProfile(path);

      if (authData["custom:role"] === "Sangat")
        return setProfile(response.Customer);
      setProfile(response.provider);
    })();
  }, []);

  return (
    <>
      {calendarModal.open && <Calendar />}
      {cancelDetailModal.open && <CancelDetails />}
      {cancelModal.open && <Cancel onCancel={() => {}} />}
      {logoutModal && <LogoutModel />}
      {successModal.open && <Success />}
      <Loader />
      <View marginInline="auto" position={"relative"}>
        <View
          as="div"
          backgroundColor={tokens.colors.font.primary}
          className="dashboard_navbar"
        >
          <Flex className="dashboard-container">
            <Flex className="dashboard-sub-container">
              <Heading
                level={3}
                className="logo-heading"
                color={{
                  large: "#fff",
                  base: `${tokens.colors.font.primary}`,
                }}
              >
                Gurudwara
              </Heading>
              <Divider
                display={{ large: "none", base: "" }}
                border={`1px solid #5C`}
              ></Divider>
            </Flex>
            <Flex className="dashboard-profile">
              <View display={{ large: "none" }}>
                <GiHamburgerMenu
                  color="white"
                  fontSize="32px"
                  onClick={() => setHidden(!hidden)}
                />
              </View>
              <View>
                <Menu
                  menuAlign="end"
                  trigger={
                    <Flex className="center dashboard-profile-container">
                      {profile?.profile_avatar && !profileImageLoad ? (
                        <StorageImage
                          imgKey={authData?.email}
                          accessLevel="protected"
                          overflow={"hidden"}
                          alt="profile"
                          className="card_background_color dashboard-profile-image"
                        />
                      ) : (
                        <Image
                          src="/profile-default.png"
                          alt="profile"
                          className="dashboard-profile-image"
                        />
                      )}
                      <Flex className="dashboard-profile-text-container">
                        <Text
                          fontSize={"16px"}
                          fontWeight={500}
                          textTransform={"capitalize"}
                          title={
                            profile?.first_name
                              ? profile?.first_name + " " + profile.last_name
                              : profile?.sp_name
                          }
                        >
                          {JSON.stringify(profile) !== "{}"
                            ? authData["custom:role"] === "Sangat"
                              ? `${profile?.first_name + profile.last_name}`
                                  .length > 16
                                ? `${
                                    profile?.first_name +
                                    " " +
                                    profile.last_name
                                  }`.slice(0, 15) + "..."
                                : profile?.first_name + " " + profile.last_name
                              : profile?.account_manager_name.length > 16
                              ? profile?.account_manager_name.slice(0, 15) +
                                "..."
                              : profile?.account_manager_name
                            : ""}
                        </Text>
                        <Text
                          fontSize={"12px"}
                          fontWeight={500}
                          title={
                            profile?.email ?? profile?.account_manager_email
                          }
                        >
                          {`${profile?.email ?? profile?.account_manager_email}`
                            .length > 24
                            ? `${
                                profile?.email ?? profile?.account_manager_email
                              }`.slice(0, 23) + "..."
                            : profile?.email ?? profile?.account_manager_email}
                        </Text>
                      </Flex>
                      <MdArrowDropDown
                        fontSize={"20px"}
                        color={tokens.colors.font.primary}
                        fontWeight={600}
                      />
                    </Flex>
                  }
                >
                  <MenuItem
                    backgroundColor={"white"}
                    color={tokens.colors.font.primary}
                    onClick={() => {
                      if (authData["custom:role"] === "Sangat") {
                        navigate("/dashboard/profile");
                      } else if (
                        authData["custom:role"] === "Service Provider"
                      ) {
                        navigate("/dashboard/serviceProvider/profile");
                      } else {
                        navigate("/");
                      }
                    }}
                  >
                    <BsPersonFill /> &nbsp;My Profile
                  </MenuItem>
                  <Divider
                    size={"small"}
                    width={"210px"}
                    marginInline={"auto"}
                    border={`1px solid ${tokens.colors.font.tertiary}`}
                  />
                  <MenuItem
                    backgroundColor={"white"}
                    color={tokens.colors.font.primary}
                    onClick={() => {
                      setLogoutModal(true);
                    }}
                  >
                    <MdOutlineLogout /> &nbsp;Logout
                  </MenuItem>
                </Menu>
              </View>
            </Flex>
          </Flex>
        </View>
        <AppWrapper>
          {authData["custom:role"] === "Sangat" ? (
            <SideBar hidden={hidden} setHidden={setHidden} />
          ) : (
            <ProviderSideBar hidden={hidden} setHidden={setHidden} />
          )}
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
        </AppWrapper>
      </View>
    </>
  );
};

export default Dashboard;
