import { View, Text, Flex, Heading, Divider } from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import {
  AiFillYoutube,
  AiFillFacebook,
  AiOutlineInstagram,
} from "react-icons/ai";

import { RiTwitterXFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";

const Footer = () => {
  const { tokens } = useTheme();

  return (
    <Flex
      direction={"column"}
      // height={{ large: "265px" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      // gap={"48px"}
      backgroundColor={tokens.colors.background.primary}
      color={"#fff"}
      padding={"40px"}
    >
      <Flex
        direction={{ large: "row", base: "column" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Heading
          level={4}
          fontSize={"36px"}
          fontWeight={700}
          color={tokens.colors.font.primary}
        >
          Gurudwara
        </Heading>

        <View as="div">
          <Text fontSize={"14px"}>
            Copyright © 2023 | All Right Reserved Gurdarbar society Malaysia
          </Text>
        </View>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          color={tokens.colors.font.secondary}
        >
          <AiFillYoutube
            color={tokens.colors.font.primary}
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
          <AiFillFacebook
            color={tokens.colors.font.primary}
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
          <RiTwitterXFill
            color={tokens.colors.font.primary}
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
          <AiOutlineInstagram
            color={tokens.colors.font.primary}
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
          <BiLogoLinkedin
            color={tokens.colors.font.primary}
            style={{
              fontSize: "24px",
              cursor: "pointer",
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
