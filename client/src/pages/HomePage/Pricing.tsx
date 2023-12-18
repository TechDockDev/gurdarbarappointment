import {
  View,
  Heading,
  Flex,
  Card,
  Text,
  Button,
  Image,
  SwitchField,
} from "@aws-amplify/ui-react";
import { useTheme } from "@aws-amplify/ui-react";

const Pricing = () => {
  const { tokens } = useTheme();

  return (
    <View
      id="pricing"
      textAlign={"center"}
      marginTop={"70px"}
      marginInline={{ large: "", base: "20px" }}
    >
      <Heading
        level={3}
        color={tokens.colors.font.tertiary}
        fontWeight={700}
        textAlign={"center"}
        fontSize={"50px"}
      >
        PRICING
      </Heading>
      <Flex
        as="div"
        textAlign={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"12rem"}
        height={"53px"}
        borderRadius={"10px"}
        marginInline={"auto"}
        backgroundColor={tokens.colors.background.primary}
        marginTop={"60px"}
        padding={"10px"}
      >
        <View as="div">
          <Text fontSize={"16px"} fontWeight={400}>
            Yearly
          </Text>
        </View>
        <View as="div">
          <SwitchField
            isDisabled={false}
            size="small"
            label
            trackCheckedColor={tokens.colors.grey}
            trackColor={tokens.colors.background.secondary}
          />
        </View>
        <View as="div">
          <Text fontSize={"16px"} fontWeight={400}>
            Monthly
          </Text>
        </View>
      </Flex>
      <Flex
        direction={{ large: "row", base: "column" }}
        justifyContent={"space-around"}
        alignItems={"center"}
        marginTop={"30px"}
      >
        {/* card 1 */}
        <Card
          height={"850px"}
          width={"100%"}
          backgroundColor={"#FFFFFF"}
          borderRadius={"10px"}
          textAlign={"center"}
          className="card_background_color"
        >
          <Flex direction={"column"} padding={"48px 0px"} gap={"32px"}>
            <View as="div">
              <Heading level={3} fontWeight={700}>
                Freelancer
              </Heading>
              <Text
                fontSize={{ large: "14px", xl: "16px" }}
                marginTop={"8px"}
                fontWeight={400}
                color={"#000000"}
              >
                Quisque donec nibh diam tellus integer eros.
              </Text>
            </View>
            <View as="div">
              <Text
                fontSize="54px"
                color={"#A2A9B0"}
                textDecoration={"line-through"}
                fontWeight={700}
                style={{
                  textDecorationThickness: "3px",
                }}
              >
                $35
              </Text>
              <Text as="p" fontSize="54px" color={"#000000"} fontWeight={700}>
                $25
              </Text>
              <Text color={"#000000"} marginTop={"8px"}>
                $25 USD per month, paid annually
              </Text>
            </View>
            <Button
              backgroundColor={tokens.colors.background.primary}
              color={tokens.colors.font.primary}
              marginInline={"auto"}
              width={"200px"}
              fontSize={"24px"}
              borderRadius={"15px"}
              className="hover-button-effect"
            >
              Get Started
            </Button>
            <Flex as="div" fontSize={"20px"} gap={"8px"} direction={"column"}>
              <Flex
                direction="row"
                gap={"8px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <Text>Feature 1</Text>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        {/* card 2 */}

        <Card
          height={"850px"}
          width={"100%"}
          backgroundColor={"#FFFFFF"}
          borderRadius={"10px"}
          textAlign={"center"}
          position={"relative"}
          className="card_background_color"
        >
          <View
            as="div"
            width={"108px"}
            height={"24px"}
            textAlign={"center"}
            fontSize={"14px"}
            fontWeight={600}
            padding={"3px"}
            borderRadius={"12px"}
            color={tokens.colors.font.primary}
            marginInline={"auto"}
            position={"absolute"}
            top={"-3px"}
            style={{
              boxSizing: "border-box",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            backgroundColor={tokens.colors.background.primary}
          >
            Most Popular
          </View>
          <Flex direction={"column"} padding={"48px 0px"} gap={"32px"}>
            <View as="div">
              <Heading level={3} fontWeight={700}>
                Professional
              </Heading>
              <Text
                fontSize={{ large: "14px", xl: "16px" }}
                marginTop={"8px"}
                fontWeight={400}
                color={"#000000"}
              >
                Quisque donec nibh diam tellus integer eros.
              </Text>
            </View>
            <View as="div">
              <Text
                fontSize="54px"
                color={"#A2A9B0"}
                textDecoration={"line-through"}
                fontWeight={700}
                style={{
                  textDecorationThickness: "3px",
                }}
              >
                $65
              </Text>
              <Text as="p" fontSize="54px" color={"#000000"} fontWeight={700}>
                $55
              </Text>
              <Text color={"#000000"} marginTop={"8px"}>
                $25 USD per month, paid annually
              </Text>
            </View>
            <Button
              backgroundColor={tokens.colors.background.primary}
              color={tokens.colors.font.primary}
              marginInline={"auto"}
              width={"200px"}
              fontSize={"24px"}
              borderRadius={"15px"}
              className="hover-button-effect"
            >
              Get Started
            </Button>
            <Flex as="div" fontSize={"20px"} gap={"8px"} direction={"column"}>
              <Flex
                direction="row"
                gap={"8px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <Text>Feature 1</Text>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
            </Flex>
          </Flex>
        </Card>

        {/* card 3 */}
        <Card
          height={"850px"}
          width={"100%"}
          backgroundColor={"#FFFFFF"}
          borderRadius={"10px"}
          textAlign={"center"}
          className="card_background_color"
        >
          <Flex direction={"column"} padding={"48px 0px"} gap={"32px"}>
            <View as="div">
              <Heading level={3} fontWeight={700}>
                Agency
              </Heading>
              <Text
                fontSize={{ large: "14px", xl: "16px" }}
                marginTop={"8px"}
                fontWeight={400}
                color={"#000000"}
              >
                Quisque donec nibh diam tellus integer eros.
              </Text>
            </View>
            <View as="div">
              <Text
                fontSize="54px"
                color={"#A2A9B0"}
                textDecoration={"line-through"}
                fontWeight={700}
                style={{
                  textDecorationThickness: "3px",
                }}
              >
                $125
              </Text>
              <Text as="p" fontSize="54px" color={"#000000"} fontWeight={700}>
                $95
              </Text>
              <Text color={"#000000"} marginTop={"8px"}>
                $25 USD per month, paid annually
              </Text>
            </View>
            <Button
              backgroundColor={tokens.colors.background.primary}
              color={tokens.colors.font.primary}
              marginInline={"auto"}
              width={"200px"}
              fontSize={"24px"}
              borderRadius={"15px"}
              className="hover-button-effect"
            >
              Get Started
            </Button>
            <Flex as="div" fontSize={"20px"} gap={"8px"} direction={"column"}>
              <Flex
                direction="row"
                gap={"8px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <Text>Feature 1</Text>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
              <Flex
                direction="row"
                justifyContent={"center"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image src="/check.png" alt="check" />
                <View as="div">
                  <Text>Feature 1</Text>
                </View>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </View>
  );
};

export default Pricing;
