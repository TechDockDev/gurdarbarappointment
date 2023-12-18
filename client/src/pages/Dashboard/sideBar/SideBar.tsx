import { useEffect, useState } from "react";
import { View, Flex, useTheme, Image } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";

type SideBarProps = {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
};

export interface sidebar {
  field: string;
  to: string;
  img: string;
}

const sideFieldArray: sidebar[] = [
  {
    field: "Booking",
    to: "user",
    img: "/dashboard.svg",
  },
  {
    field: "Appointments",
    to: "appointments/upcoming",
    img: "/notes.svg",
  },
  {
    field: "My Profile",
    to: "profile",
    img: "/people.svg",
  },
];

const SideBar = ({ hidden, setHidden }: SideBarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSelected, setIsSelected] = useState<
    "Dashboard" | "Appointments" | "Manage Schedule" | "Profile" | string
  >("");

  useEffect(() => {
    setIsSelected(
      location.pathname.split("/dashboard/").slice(-1)[0].split("/")[0]
    );
  }, [location]);

  const { tokens } = useTheme();
  return (
    <View
      left={{ large: "0px", base: hidden ? "0px" : "-1000px" }}
      className="sidebar-container"
    >
      <Flex direction={"column"} paddingBlock={"18px"}>
        {sideFieldArray.map((val, idx) => {
          return (
            <Flex
              key={idx}
              onClick={() => {
                setHidden(false);
                navigate(`/dashboard/${val.to}`);
              }}
              className={
                isSelected && val.to.startsWith(isSelected)
                  ? "sidebar-items-container selected"
                  : "sidebar-items-container"
              }
            >
              <Image
                src={val.img}
                alt={val.field}
                width="20px"
                style={{
                  filter: ` invert(${
                    isSelected && val.to.startsWith(isSelected) ? 1 : 0
                  })`,
                }}
              />
              <View
                as="div"
                fontSize={"20px"}
                fontWeight={500}
                color={
                  isSelected && val.to.startsWith(isSelected)
                    ? tokens.colors.white
                    : `rgba(48, 48, 48, 1)`
                }
              >
                {val.field}
              </View>
            </Flex>
          );
        })}
      </Flex>
    </View>
  );
};

export default SideBar;
