import {
  Grid,
  View,
  Flex,
  Image,
  Heading,
  Text,
  Button,
} from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const { tokens } = useTheme();
  const navigate = useNavigate();
  return (
    <Grid
      templateColumns="1fr 1fr 1fr 1fr 1fr 1fr"
      alignItems={"center"}
      gap={"30px"}
      paddingTop={{ large: "6rem", base: "1rem" }}
    >
      <View
        id="heroSection"
        as="div"
        alignSelf={"start"}
        columnStart={1}
        marginTop={"50px"}
        columnEnd={{ large: "4", base: "7" }}
        textAlign={{ large: "", base: "center" }}
        marginInline={{ large: "", base: "20px" }}
      >
        <Flex direction={"column"} color={"#FFFFFF"} gap={"6px"}>
          <Heading
            color={"#FFFFFF"}
            fontWeight={700}
            fontSize={{ xl: "36px", large: "28px", base: "36px" }}
          >
            Welcome to Our gurdwara sahib Booking System
          </Heading>
          <Text
            color={"#FFFFFF"}
            fontSize={{ xl: "28px", large: "24px", base: "32px" }}
            fontWeight={400}
            marginTop={"20px"}
          >
            Experience the convenience of seamless Gurdwara scheduling with our
            user- friendly online booking platform.
          </Text>
          <Button
            marginTop={"20px"}
            width={"266px"}
            marginInline={{ large: "0px", base: "auto" }}
            backgroundColor={tokens.colors.background.primary}
            color={tokens.colors.font.primary}
            borderRadius={"15px"}
            // fontSize={"24px"}
            className="hover-button-effect"
            onClick={() => navigate("/book-a-demo")}
          >
            Book Gurdwara Sahib
          </Button>
        </Flex>
      </View>
      <View
        columnStart={"4"}
        columnEnd={7}
        alignSelf={"start"}
        display={{ large: "block", base: "none" }}
      >
        <Image alt="frontImage" src="/HeroSection.svg" width={"100%"} />
      </View>
    </Grid>
  );
};

export default HeroSection;
