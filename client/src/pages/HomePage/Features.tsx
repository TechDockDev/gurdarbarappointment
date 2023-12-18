import { Heading, View, Grid, Image, Text } from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";

const Features = () => {
  const { tokens } = useTheme();

  return (
    <View
      id="features"
      textAlign={"center"}
      marginTop={{ large: "18px", base: "40px" }}
    >
      <Heading
        level={3}
        color={tokens.colors.font.tertiary}
        fontSize={"50px"}
        fontWeight={700}
        textAlign={"center"}
      >
        FEATURES
      </Heading>

      <Grid
        templateColumns={{ large: "1fr 1fr 1fr", base: "1fr" }}
        templateRows={{ large: "1fr 1fr", base: "1fr" }}
        columnGap={"70px"}
        rowGap={"70px"}
        marginTop={"70px"}
        marginInline={"auto"}
        width={"100%"}
      >
        <View as="div" textAlign={"center"}>
          <Image src="/case.png" alt="case Icon" width="40px" />
          <Text
            color={tokens.colors.font.tertiary}
            fontSize={"24px"}
            lineHeight={"2rem"}
          >
            Cool features
          </Text>
          <Text
            as="p"
            color={"#FFFFFF"}
            fontSize={"24px"}
            fontWeight={400}
            marginTop={"16px"}
          >
            Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
          </Text>
        </View>

        <View as="div" textAlign={"center"}>
          <Image src="/service.png" alt="case Icon" width="40px" />
          <Text color={tokens.colors.font.tertiary} fontSize={"24px"}>
            Great service
          </Text>
          <Text as="p" color={"#FFFFFF"} fontSize={"24px"} marginTop={"16px"}>
            Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
          </Text>
        </View>

        <View as="div" textAlign={"center"}>
          <Image src="/service.png" alt="case Icon" width="40px" />
          <Text color={tokens.colors.font.tertiary} fontSize={"24px"}>
            Best product
          </Text>
          <Text as="p" color={"#FFFFFF"} fontSize={"24px"} marginTop={"16px"}>
            Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
          </Text>
        </View>

        <View as="div" textAlign={"center"}>
          <Image src="/heart.png" alt="case Icon" width="40px" />
          <Text color={tokens.colors.font.tertiary} fontSize={"24px"}>
            More stuff
          </Text>
          <Text as="p" color={"#FFFFFF"} fontSize={"24px"} marginTop={"16px"}>
            Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
          </Text>
        </View>

        <View as="div" textAlign={"center"}>
          <Image src="/bus.png" alt="case Icon" width="40px" />
          <Text color={tokens.colors.font.tertiary} fontSize={"24px"}>
            Really fast
          </Text>
          <Text as="p" color={"#FFFFFF"} fontSize={"24px"} marginTop={"16px"}>
            Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
          </Text>
        </View>
        <View as="div" textAlign={"center"}>
          <Image src="/bus.png" alt="case Icon" width="40px" />
          <Text color={tokens.colors.font.tertiary} fontSize={"24px"}>
            Super secure
          </Text>
          <Text as="p" color={"#FFFFFF"} fontSize={"24px"} marginTop={"16px"}>
            Egestas elit dui scelerisque ut eu purus aliquam vitae habitasse.
          </Text>
        </View>
      </Grid>
    </View>
  );
};

export default Features;
